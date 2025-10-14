import {logger} from '../config.js';
import {bot} from './bot.js';
import {openCategoryCollection} from './nitrobase.js';

import type {GrammyError} from 'grammy';

export type TelegramNotifyOption = {
  categoryId: string;
  message: string;
  markdown: boolean;
};

/**
 * Send a message to all members of the `categoryId`.
 */
export async function telegramNotify(option: TelegramNotifyOption): Promise<void> {
  logger.logMethodArgs?.('telegramNotify', option);
  const categoryCollection = await openCategoryCollection();
  const members = categoryCollection.getItemData(option.categoryId).members;
  for (let i = members.length - 1; i >= 0; i--) {
    const member = members[i];
    try {
      await bot.api.sendMessage(member.id, option.message, {
        parse_mode: option.markdown ? 'MarkdownV2' : undefined,
      });
    }
    catch (error_) {
      const error = error_ as GrammyError;
      logger.error('sendMessage', 'error_send_message', error, option);

      // Remove if blocked
      if (error.error_code === 403) {
        const memberIndex = members.indexOf(member);
        if (memberIndex === -1) {
          logger.accident?.('telegramNotify', 'unexpected_member_not_found_to_remove', {member, members});
        }
        members.splice(memberIndex, 1);
        categoryCollection.save();
      }
    }
  }
  logger.logStep?.('telegramNotify', 'done');
}
