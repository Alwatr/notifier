import {Keyboard} from 'grammy';

import {bot} from '../lib/bot.js';
import {logger} from '../lib/logger.js';
import {messages} from '../lib/message.js';
import {sendMessage} from '../lib/send-message.js';
import {userCollection} from '../lib/users-collection.js';

bot.on('message:contact', async (ctx) => {
  const {chat, from, message} = ctx;
  if (!from || !message.contact) {
    return;
  }

  logger.logMethodArgs?.('message_contact', message);

  const contact = message.contact;
  const vars = {
    name: `${from.first_name} ${from.last_name ?? ''}`.trim(),
  };

  // Ensure the contact is from the user themselves
  if (contact.user_id !== from.id || !contact.phone_number) {
    ctx.reply(messages.invalid_contact_text, {
      reply_markup: new Keyboard().requestContact(messages.request_contact_keyboard_text).resized().oneTime(),
    });
    return;
  }

  userCollection.mergeItemData(chat.id, {
    phone: contact.phone_number,
  });

  await sendMessage({
    chatId: chat.id,
    messages: messages.register_success,
    vars,
  });
});
