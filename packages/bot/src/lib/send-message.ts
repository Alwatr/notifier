import {delay} from 'alwatr/nanolib';

import {bot} from './bot.js';
import {logger} from './logger.js';
import {replaceString} from './replacer.js';

import type {MsgItem} from './message.js';
import type {ForceReply, InlineKeyboardMarkup, ReplyKeyboardMarkup, ReplyKeyboardRemove} from 'grammy/types';

type sendMessageOptions = {
  chatId: number;
  messages: MsgItem[];
  vars?: DictionaryReq<string>;
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
};

export async function sendMessage(options: sendMessageOptions) {
  for (const msg of options.messages) {
    try {
      switch (msg.type) {
        case 'delay':
          await delay.by(msg.duration);
          break;
        case 'text':
          await bot.api.sendMessage(options.chatId, replaceString(msg.text, options.vars), {
            reply_markup: msg.keyboard ?? options.reply_markup,
            parse_mode: msg.parseMode,
          });
          break;

        case 'forward':
          await bot.api.copyMessage(options.chatId, msg.fromChatId, msg.messageId, {
            reply_markup: msg.keyboard ?? options.reply_markup,
          });
          break;

        case 'photo':
          await bot.api.sendPhoto(options.chatId, msg.fileId, {
            caption: replaceString(msg.caption, options.vars),
            parse_mode: msg.parseMode,
            reply_markup: msg.keyboard ?? options.reply_markup,
          });
      }
    }
    catch (error) {
      logger.error?.('sendMessage', 'unexpected_error', error, {chatId: options.chatId, msgs: options.messages});
    }
  }
}
