import {config} from '../config.js';
import {bot} from '../lib/bot.js';
import {logger} from '../lib/logger.js';
import {mainMenu, menuItems} from '../lib/menu.js';
import {messages} from '../lib/message.js';
import {sendMessage} from '../lib/send-message.js';
import {userCollection} from '../lib/users-collection.js';

for (const menuId in menuItems) {
  const menuText = menuItems[menuId as keyof typeof menuItems];
  bot.hears(menuText, async (ctx, next) => {
    try {
      const {chat, from} = ctx;

      logger.logMethodArgs?.('hears_' + menuId, from);

      if (!from) return;

      const referralCount = userCollection.getItemData(from.id).referralCount;
      const vars = {
        name: `${from.first_name} ${from.last_name ?? ''}`.trim(),
        invite_link: `https://t.me/${config.telegramBot.username}?start=ref_${from.id}`,
        referral_count: referralCount.toString(),
        referral_earn: (referralCount * config.referralRewardPerUser).toLocaleString('fa-IR'),
      };

      await sendMessage({
        chatId: chat.id,
        messages: messages[menuId as keyof typeof menuItems],
        reply_markup: mainMenu,
        vars,
      });
    }
    catch (err) {
      logger.error('hears_' + menuId, 'unexpected_error', err);
    }

    next();
  });
}

bot.hears(menuItems.stats, async (ctx, next) => {
  const {from} = ctx;
  logger.logMethodArgs?.('hears_stats2', from);
  if (!from) return;

  try {
    let text = 'لیست تمامی کاربرانی که توسط لینک اختصاصی شما اولین قدم را برداشته اند:\n\n';

    for (const user of userCollection.items()) {
      if (user.data.invitedBy === from.id) {
        text += `- ${user.data.firstName} ${user.data.lastName} @${user.data.username ?? '---'}`;

        const extraInfo = [];

        if (user.data.courses.symphonyPaid) {
          extraInfo.push('🎉 تکمیل ثبت نام!');
        }
        else {
          if (user.data.blocked) {
            extraInfo.push('بلاک کرده!');
          }
          if (user.data.courses.wesunGroup) {
            extraInfo.push('اهالی قدیم ویسان!');
          }
          if (!user.data.courses.symphonyGroup) {
            extraInfo.push('عضو گروه نیست!');
          }
        }

        if (extraInfo.length > 0) {
          text += ` (${extraInfo.join(', ')})`;
        }

        text += '\n\n';
      }
    }

    text += '\n\nدر صورت نهایی شدن ثبت‌نام این کاربران، مبلغ هدیه به حساب شما واریز خواهد شد.';

    await ctx.reply(text);
  }
  catch (err) {
    logger.error('hears_stats2', 'unexpected_error', err);
  }
  next();
});
