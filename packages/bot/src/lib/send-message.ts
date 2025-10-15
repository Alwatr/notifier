import {bot} from './bot.js';
import {logger} from './logger.js';

import type {MsgItem} from './message.js';

export async function sendMessage(chatId: number, msgs: MsgItem[]) {
  for (const msg of msgs) {
    try {
      switch (msg.type) {
        case 'text':
          await bot.api.sendMessage(chatId, msg.text);
          break;
        case 'simple':
          await bot.api.copyMessage(chatId, msg.fromChatId, msg.messageId);
          break;
      }
    }
    catch (error) {
      logger.error?.('sendMessage', 'unexpected_error', error, {chatId, msgs});
    }
  }
}
