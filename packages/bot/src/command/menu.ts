import {bot} from '../lib/bot.js';
import {logger} from '../lib/logger.js';
import {mainMenu, menuItems} from '../lib/menu.js';
import {messages} from '../lib/message.js';
import {sendMessage} from '../lib/send-message.js';

bot.hears(menuItems.inviteFriends, async (ctx) => {
  const {chat, from} = ctx;

  logger.logMethodArgs?.('hears_invite_friends', from);

  if (!from) return;

  const vars = {
    name: `${from.first_name} ${from.last_name ?? ''}`.trim(),
    invite_link: `https://t.me/${config.telegramBot.username}?start=ref_${from.id}`,
  };

  await sendMessage({
    chatId: chat.id,
    messages: messages.referral_templates,
    reply_markup: mainMenu,
    vars,
  });
});
