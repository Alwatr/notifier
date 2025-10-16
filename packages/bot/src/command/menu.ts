import {config} from '../config.js';
import {bot} from '../lib/bot.js';
import {logger} from '../lib/logger.js';
import {mainMenu, menuItems} from '../lib/menu.js';
import {messages} from '../lib/message.js';
import {sendMessage} from '../lib/send-message.js';
import {userCollection} from '../lib/users-collection.js';

for (const menuId in menuItems) {
  const menuText = menuItems[menuId as keyof typeof menuItems];
  bot.hears(menuText, async (ctx) => {
    try {
      const {chat, from} = ctx;

      logger.logMethodArgs?.('hears_' + menuId, from);

      if (!from) return;

      const vars = {
        name: `${from.first_name} ${from.last_name ?? ''}`.trim(),
        invite_link: `https://t.me/${config.telegramBot.username}?start=ref_${from.id}`,
        referral_count: userCollection.getItemData(from.id).referralCount.toString(),
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
  });
}
