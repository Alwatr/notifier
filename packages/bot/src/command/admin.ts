import {GrammyError} from 'grammy';

import {config} from '../config.js';
import {bot} from '../lib/bot.js';
import {logger} from '../lib/logger.js';
import {mainMenu} from '../lib/menu.js';
import {replaceString} from '../lib/replacer.js';
import {userCollection} from '../lib/users-collection.js';

let currentAdminCommand = '';

bot.command('admin_stats', (ctx) => {
  const {chat, from} = ctx;

  logger.logMethodArgs?.('command_admin_stats', chat);

  if (from?.username !== config.adminUserName) {
    return;
  }

  const stats = {
    total: 0,
    withoutPhone: 0,
    withoutReferrals: 0,
    joinedNormally: 0,
    joinedViaReferral: 0,
    blocked: 0,
  };

  for (const user of userCollection.items()) {
    stats.total++;

    if (user.data.invitedBy === null) {
      stats.joinedNormally++;
    }
    else {
      stats.joinedViaReferral++;
    }

    if (user.data.phone === null) {
      stats.withoutPhone++;
    }

    if (user.data.blocked) {
      stats.blocked++;
    }

    if (user.data.referralCount === 0) {
      stats.withoutReferrals++;
    }
  }

  ctx
    .reply(
      `آماتار کاربران:

کل کاربران: ${stats.total}
پیوسته به‌صورت عادی: ${stats.joinedNormally}
پیوسته از طریق دعوت: ${stats.joinedViaReferral}
بدون شماره تلفن: ${stats.withoutPhone}
بلاک کرده‌اند: ${stats.blocked}    
هنوز دعوت نکرده‌اند: ${stats.withoutReferrals}
`,
    )
    .catch((error) => {
      logger.error('command_admin_stats', 'reply_failed', error, {chat, stats});
    });
});

bot.command('notify_all', async (ctx) => {
  const {chat, from} = ctx;

  logger.logMethodArgs?.('command_notify_all', chat);

  if (from?.username !== config.adminUserName) {
    return;
  }

  currentAdminCommand = 'notify_all';
  ctx.reply('Send the message to notify all users');
});

bot.command('notify_noref', async (ctx) => {
  const {chat, from} = ctx;

  logger.logMethodArgs?.('command_notify_noref', chat);

  if (from?.username !== config.adminUserName) {
    return;
  }

  currentAdminCommand = 'notify_noref';
  ctx.reply('Send the message to notify users without referrals');
});

bot.command('check_all_users', async (ctx) => {
  const {chat, from} = ctx;

  logger.logMethodArgs?.('command_check_all_users', chat);

  if (from?.username !== config.adminUserName) {
    return;
  }

  for (const user of userCollection.items()) {
    try {
      const msg = await ctx.api.sendMessage(user.meta.id, '👋');
      await bot.api.deleteMessage(msg.chat.id, msg.message_id);
      if (user.data.blocked) {
        user.data.blocked = false;
        userCollection.save(user.meta.id);
      }
    }
    catch (error) {
      if (error instanceof GrammyError && error.error_code === 403) {
        user.data.blocked = true;
        userCollection.save(user.meta.id);
      }
      else {
        logger.error('command_check_all_users', 'send_message_failed', error, user);
      }
    }
  }
});

// message_notify_*
bot.on('message', async (ctx, next) => {
  const {chat, from, message} = ctx;

  if (from?.username !== config.adminUserName || !currentAdminCommand.startsWith('notify_')) {
    return next();
  }
  // else

  logger.logMethodArgs?.('message_notify_*', message);

  currentAdminCommand = '';

  const stats = {
    total: 0,
    sent: 0,
    failed: 0,
  };

  for (const user of userCollection.items()) {
    if (currentAdminCommand === 'notify_noref' && user.data.referralCount > 0) {
      continue;
    }
    try {
      stats.total++;
      const vars = {
        name: `${user.data.firstName} ${user.data.lastName ?? ''}`.trim(),
        invite_link: `https://t.me/${config.telegramBot.username}?start=ref_${user.data.id}`,
        referral_count: user.data.referralCount.toString(),
      };
      if (message.text) {
        await bot.api.sendMessage(user.data.id, replaceString(message.text, vars), {
          reply_markup: mainMenu,
        });
      }
      else if (message.caption) {
        await bot.api.copyMessage(user.data.id, chat.id, message.message_id, {
          caption: replaceString(message.caption, vars),
          reply_markup: mainMenu,
        });
      }
      else {
        await bot.api.copyMessage(user.data.id, chat.id, message.message_id, {
          reply_markup: mainMenu,
        });
      }
      stats.sent++;
      if (user.data.blocked) {
        user.data.blocked = false;
        userCollection.save(user.meta.id);
      }
    }
    catch (error) {
      stats.failed++;

      if (error instanceof GrammyError && error.error_code === 403) {
        logger.incident?.('message_notify_*', 'user_blocked_bot', {user, message});
        user.data.blocked = true;
        userCollection.save(user.meta.id);
      }
      else {
        logger.error('message_notify_*', 'send_message_failed', error, {user, message});
      }
    }
  }

  ctx.reply(`Notification sent.\n\nTotal: ${stats.total}\nSent: ${stats.sent}\nFailed: ${stats.failed}`).catch((error) => {
    logger.error('command_notify_*', 'reply_failed', error, {chat, stats});
  });
});
