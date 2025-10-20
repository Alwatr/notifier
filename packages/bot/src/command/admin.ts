import {randPick} from 'alwatr/nanolib';
import {Context, GrammyError, type CommandContext} from 'grammy';

import {config} from '../config.js';
import {bot} from '../lib/bot.js';
import {logger} from '../lib/logger.js';
import {mainMenu} from '../lib/menu.js';
import {messages} from '../lib/message.js';
import {replaceString} from '../lib/replacer.js';
import {sendMessage} from '../lib/send-message.js';
import {userCollection} from '../lib/users-collection.js';

function checkAdminRight(ctx: CommandContext<Context>): boolean {
  const {from, message} = ctx;

  logger.logMethodArgs?.('checkAdminRight', from?.username);

  if (from?.username === 'ftme_sa') {
    // nan joon
    void ctx.reply(randPick(messages.fun), {
      reply_parameters: {
        message_id: message!.message_id,
      },
    });
    return false;
  }

  if (from?.username && !config.adminUserNames.includes(from.username)) {
    void ctx.reply(messages.noAdminRight, {
      reply_parameters: {
        message_id: message!.message_id,
      },
    });
    return false;
  }
  return true;
}

bot.command('admin_stats', (ctx) => {
  const {chat, message} = ctx;

  logger.logMethodArgs?.('command_admin_stats', chat);

  if (!checkAdminRight(ctx)) return;

  const stats = {
    total: 0,
    withoutPhone: 0,
    withoutReferrals: 0,
    joinedNormally: 0,
    joinedViaReferral: 0,
    joinedViaReferralNoWesun: 0,
    blocked: 0,
    wesunMembers: 0,
    symphonyGroup: 0,
    symphonyPaid: 0,
  };

  for (const user of userCollection.items()) {
    stats.total++;

    if (user.data.invitedBy === null) {
      stats.joinedNormally++;
    }
    else {
      stats.joinedViaReferral++;
      if (!user.data.courses.wesunGroup) {
        stats.joinedViaReferralNoWesun++;
      }
    }

    if (!user.data.phone) {
      stats.withoutPhone++;
    }

    if (user.data.blocked) {
      stats.blocked++;
    }

    if (user.data.referralCount === 0) {
      stats.withoutReferrals++;
    }

    if (user.data.courses.wesunGroup) {
      stats.wesunMembers++;
    }

    if (user.data.courses.symphonyGroup) {
      stats.symphonyGroup++;
    }

    if (user.data.courses.symphonyPaid) {
      stats.symphonyPaid++;
    }
  }

  ctx
    .reply(
      `آمار کاربران:

کل کاربران: ${stats.total}
پیوسته به‌صورت عادی: ${stats.joinedNormally}
پیوسته از طریق دعوت: ${stats.joinedViaReferral}
پیوسته از طریق دعوت (غیر اهلی): ${stats.joinedViaReferralNoWesun}
بدون شماره تلفن: ${stats.withoutPhone}
بلاک کرده‌اند: ${stats.blocked}    
هنوز دعوت نکرده‌اند: ${stats.withoutReferrals}
اهلی: ${stats.wesunMembers}
عضو گروه: ${stats.symphonyGroup}
پرداخت شده: ${stats.symphonyPaid}
`,
      {
        reply_parameters: {
          message_id: message!.message_id,
        },
        reply_markup: {
          remove_keyboard: true,
        },
      },
    )
    .catch((error) => {
      logger.error('command_admin_stats', 'reply_failed', error, {chat, stats});
    });
});

bot.command('check_all_users', async (ctx) => {
  const {chat, message} = ctx;

  logger.logMethodArgs?.('command_check_all_users', chat);

  if (!checkAdminRight(ctx)) return;

  for (const user of userCollection.items()) {
    try {
      // check blocking status
      const msg = await ctx.api.sendMessage(user.data.id, '👋');
      await bot.api.deleteMessage(msg.chat.id, msg.message_id);
      if (user.data.blocked) {
        user.data.blocked = false;
        userCollection.save(user.data.id);
      }

      // check symphony group membership
      let chatMember = await bot.api.getChatMember(config.courses.symphony.telegramChatId, user.data.id);
      if (
        chatMember.status === 'creator' ||
        chatMember.status === 'administrator' ||
        chatMember.status === 'member' ||
        chatMember.status === 'restricted'
      ) {
        if (!user.data.courses.symphonyGroup) {
          user.data.courses.symphonyGroup = true;
          userCollection.save(user.data.id);
        }
      }

      // check wesun group membership
      chatMember = await bot.api.getChatMember(config.courses.wesunMembersTelegramChatId, user.data.id);
      if (
        chatMember.status === 'creator' ||
        chatMember.status === 'administrator' ||
        chatMember.status === 'member' ||
        chatMember.status === 'restricted'
      ) {
        if (!user.data.courses.wesunGroup) {
          user.data.courses.wesunGroup = true;
          userCollection.save(user.data.id);
        }
      }
    }
    catch (error) {
      if (error instanceof GrammyError && error.error_code === 403) {
        user.data.blocked = true;
        userCollection.save(user.data.id);
      }
      else {
        logger.error('command_check_all_users', 'send_message_failed', error, user);
      }
    }
  }

  void ctx.reply('بررسی تمام کاربران به پایان رسید. 😎\n\n/admin_stats', {
    reply_parameters: {
      message_id: message!.message_id,
    },
  });
});

bot.command('notify_all', async (ctx) => {
  const {chat, message} = ctx;

  logger.logMethodArgs?.('command_notify_all', chat);

  if (!checkAdminRight(ctx)) return;

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
        userCollection.save(user.data.id);
      }
    }
    catch (error) {
      stats.failed++;

      if (error instanceof GrammyError && error.error_code === 403) {
        logger.incident?.('message_notify_*', 'user_blocked_bot', {user, message});
        user.data.blocked = true;
        userCollection.save(user.data.id);
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
          message_id: message.message_id,
        },
      },
    )
    .catch((error) => {
      logger.error('command_notify_*', 'reply_failed', error, {chat, stats});
    });
});

bot.command('pay', async (ctx) => {
  const {chat, message} = ctx;

  logger.logMethodArgs?.('command_pay', chat);

  if (!checkAdminRight(ctx)) return;

  const targetMessage = message?.reply_to_message;
  const targetUser = targetMessage?.forward_origin?.type === 'user' ? targetMessage.forward_origin.sender_user : null;

  if (!targetUser) {
    void ctx.reply('آبجی برای کدوم کاربر می‌خوای پرداخت بزنی خب؟! 🤔\nلطفا به پیام فوروارد شده از اون کاربر رو ریپلای کن.', {
      reply_parameters: {
        message_id: message!.message_id,
      },
    });
    return;
  }

  if (!userCollection.hasItem(targetUser.id)) {
    logger.accident('command_pay', 'user_not_in_database', {message});
    void ctx.reply(
      `آبجی این کاربر توی لیست ما نیست! 🤔

${targetUser.first_name} ${targetUser.last_name ?? ''} @${targetUser.username ?? '---'}`.trim(),
      {
        reply_parameters: {
          message_id: message!.message_id,
        },
      },
    );
    return;
  }

  const targetUserData = userCollection.getItemData(targetUser.id);
  targetUserData.courses.symphonyPaid = true;
  userCollection.save(targetUser.id);

  void ctx.reply(`پرداخت برای کاربر ثبت شد. 😎`, {
    reply_parameters: {
      message_id: message!.message_id,
    },
  });

  if (targetUserData.invitedBy) {
    const referralUser = userCollection.getItemData(targetUserData.invitedBy);
    sendMessage({
      chatId: referralUser.id,
      messages: messages.new_referral_paid,
      vars: {
        name: `${targetUserData.firstName} ${targetUserData.lastName ?? ''} @${targetUserData.username ?? '---'}`.trim(),
      },
    });
  }
});
