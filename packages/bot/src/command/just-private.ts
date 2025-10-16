import {bot} from '../lib/bot.js';
import {logger} from '../lib/logger.js';
import {messages} from '../lib/message.js';
import {sendMessage} from '../lib/send-message.js';
import {userCollection} from '../lib/users-collection.js';

bot.on('message', async (ctx, next) => {
  logger.logMethodArgs?.('message', ctx.message);

  if (ctx.chat.type !== 'private') {
    logger.incident?.('startCommand', 'invalid_chat_type');
    await sendMessage({
      chatId: ctx.chat.id,
      messages: messages.private_chat_only,
    });
    return;
  }
  // else

  if (userCollection.hasItem(ctx.from.id) && userCollection.getItemData(ctx.from.id).phone === null && !ctx.message.contact) {
    await sendMessage({
      chatId: ctx.chat.id,
      messages: messages.invalid_contact,
    });
    return;
  }
  // else

  next();
});
