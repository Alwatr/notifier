import {GrammyError} from 'grammy';

import {config} from '../config.js';
import {bot} from '../lib/bot.js';
import {logger} from '../lib/logger.js';
import {mainMenu} from '../lib/menu.js';
import {replaceString} from '../lib/replacer.js';
import {userCollection} from '../lib/users-collection.js';

bot.command('admin_stats', (ctx) => {
  const {chat, from, message} = ctx;

  logger.logMethodArgs?.('command_admin_stats', chat);

  if (from?.username !== config.adminUserName) {
    void ctx.reply('ببخشید شما؟! 🤨', {
      reply_parameters: {
        message_id: message!.message_id,
      },
    });
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
      {
        reply_parameters: {
          message_id: message!.message_id,
        },
      },
    )
    .catch((error) => {
      logger.error('command_admin_stats', 'reply_failed', error, {chat, stats});
    });
});

bot.command('check_all_users', async (ctx) => {
  const {chat, from, message} = ctx;

  logger.logMethodArgs?.('command_check_all_users', chat);

  if (from?.username !== config.adminUserName) {
    void ctx.reply('ببخشید شما؟! 🤨', {
      reply_parameters: {
        message_id: message!.message_id,
      },
    });
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

  void ctx.reply('بررسی تمام کاربران به پایان رسید. 😎', {
    reply_parameters: {
      message_id: message!.message_id,
    },
  });
});

bot.command('notify_all', async (ctx) => {
  const {chat, from, message} = ctx;

  logger.logMethodArgs?.('command_notify_all', chat);

  if (from?.username !== config.adminUserName) {
    void ctx.reply('ببخشید شما؟! 🤨', {
      reply_parameters: {
        message_id: message!.message_id,
      },
    });
    return;
  }

  const targetMessage = message?.reply_to_message;

  if (!targetMessage) {
    ctx
      .reply('چی رو بفرستم خب؟! 🤔', {
        reply_parameters: {
          message_id: message!.message_id,
        },
      })
      .catch((error) => {
        logger.error('command_notify_all', 'reply_failed', error, {chat});
      });
    return;
  }

  const stats = {
    total: 0,
    sent: 0,
    failed: 0,
  };

  for (const user of userCollection.items()) {
    try {
      stats.total++;
      const vars = {
        name: `${user.data.firstName} ${user.data.lastName ?? ''}`.trim(),
        invite_link: `https://t.me/${config.telegramBot.username}?start=ref_${user.data.id}`,
        referral_count: user.data.referralCount.toString(),
      };
      if (targetMessage.caption) {
        await bot.api.copyMessage(user.data.id, targetMessage.chat.id, targetMessage.message_id, {
          caption: replaceString(targetMessage.caption, vars),
          reply_markup: mainMenu,
        });
      }
      else {
        await bot.api.copyMessage(user.data.id, targetMessage.chat.id, targetMessage.message_id, {
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

  ctx
    .reply(
      `ارسال شد 😎

👤 کل کاربران: ${stats.total}
✅ ارسال موفق: ${stats.sent}
❌ ارسال ناموفق: ${stats.failed}
`,
      {
        reply_parameters: {
          message_id: targetMessage.message_id,
        },
      },
    )
    .catch((error) => {
      logger.error('command_notify_*', 'reply_failed', error, {chat, stats});
    });
});
