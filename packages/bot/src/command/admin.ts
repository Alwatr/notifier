import {config} from '../config.js';
import {bot} from '../lib/bot.js';
import {logger} from '../lib/logger.js';
import {mainMenu} from '../lib/menu.js';
import {replaceString} from '../lib/replacer.js';
import {userCollection} from '../lib/users-collection.js';

let currentAdminCommand = '';

bot.command('notify_all', async (ctx) => {
  const {chat, from} = ctx;

  logger.logMethodArgs?.('command_notify_all', chat);

  if (from?.username !== config.adminUserName) {
    return;
  }

  currentAdminCommand = 'notify_all';
});

bot.command('notify_noref', async (ctx) => {
  const {chat, from} = ctx;

  logger.logMethodArgs?.('command_notify_noref', chat);

  if (from?.username !== config.adminUserName) {
    return;
  }

  currentAdminCommand = 'notify_noref';
});

// notify_all
bot.on('message', async (ctx, next) => {
  const {chat, from, message} = ctx;
  logger.logMethodArgs?.('message_notify_all', message);

  if (from?.username !== config.adminUserName || !currentAdminCommand.startsWith('notify_')) {
    return next();
  }
  // else

  currentAdminCommand = '';

  for (const user of userCollection.items()) {
    if (currentAdminCommand === 'notify_noref' && user.data.referralCount > 0) {
      continue;
    }
    try {
      const vars = {
        name: `${user.data.firstName} ${user.data.lastName ?? ''}`.trim(),
        referral_count: user.data.referralCount.toString(),
        invite_link: `https://t.me/${config.telegramBot.username}?start=ref_${user.data.id}`,
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
    }
    catch (error) {
      logger.error('message_notify_all', 'send_message_failed', error, {user, message});
    }
  }
});
