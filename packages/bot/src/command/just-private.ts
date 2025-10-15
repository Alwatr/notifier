import {bot} from '../lib/bot.js';
import {logger} from '../lib/logger.js';
import {messages} from '../lib/message.js';
import {sendMessage} from '../lib/send-message.js';

bot.on('message', async (ctx, next) => {
  logger.logMethodArgs?.('message', ctx.message);
  if (ctx.chat.type !== 'private') {
    logger.incident?.('startCommand', 'invalid_chat_type');
    return sendMessage({
      chatId: ctx.chat.id,
      messages: messages.private_chat_only,
    });
  }
  next();
});
