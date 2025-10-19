import {bot} from '../lib/bot.js';
import {logger} from '../lib/logger.js';
import {messages, userDeclineContactMessage} from '../lib/message.js';
import {sendMessage} from '../lib/send-message.js';
import {userCollection} from '../lib/users-collection.js';

bot.on('message', async (ctx, next) => {
  const {chat, from, message} = ctx;
  logger.logMethodArgs?.('message', message);

  if (
    userCollection.hasItem(from.id) && // existing user
    userCollection.getItemData(from.id).phone === null && // no contact info
    !message.contact // no contact info shared in this message
  ) {
    if (message.text === userDeclineContactMessage) {
      userCollection.mergeItemData(chat.id, {
        phone: '',
      });

      await sendMessage({
        chatId: chat.id,
        messages: messages.register_success,
        vars: {
          name: `${from.first_name} ${from.last_name ?? ''}`.trim(),
        },
      });
    }
    else {
      await sendMessage({
        chatId: chat.id,
        messages: messages.invalid_contact,
      });
      return;
    }
  }
  // else

  next();
});
