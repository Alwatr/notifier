import {getUnsubscribeInlineKeyboardData} from './unsubscribe-callback.js';
import {bot} from '../lib/bot.js';
import {config, logger} from '../lib/config.js';
import {cryptoFactory} from '../lib/crypto.js';
import {alwatrNitrobase} from '../lib/nitrobase.js';
import {escapeMessage} from '../lib/util.js';

import type {GrammyError} from 'grammy';

/**
 * Send a message to member of groupId.
 *
 * @param categoryId - Category(group) ID.
 * @param message_ - Message to send.
 */
export async function
sendMessageToGroup(categoryId: string, message_: string): Promise<void> {
  logger.logMethodArgs?.('sendMessageToGroup', {categoryId});
  message_ = escapeMessage(message_);

  const categoriesCollection = await alwatrNitrobase.openCollection<CategoryItem>(config.nitrobase.categoriesCollection);

  if (
    cryptoFactory.verifyUserId(categoryId) === false ||
    categoriesCollection.hasItem(categoryId) === false
  ) {
    return;
  }

  const groupData = categoriesCollection.getItemData(categoryId);

  for (const member of groupData.memberList) {
    try {
      await bot.api.sendMessage(member.id, message_, {
        parse_mode: 'MarkdownV2',
        reply_markup: {
          inline_keyboard: [
            [
              getUnsubscribeInlineKeyboardData(categoryId),
            ],
          ],
        },
      });
    }
    catch (err) {
      const err_ = err as GrammyError;
      logger.error('sendMessage', 'error_send_message', err_, {chatId: member.id});

      // remove if blocked
      if (err_.error_code === 403) {
        groupData.memberList = groupData.memberList.filter((member_) => member_.id !== member.id);
        categoriesCollection.mergeItemData(categoryId, groupData);
        categoriesCollection.save();
      }
    }
  }
}
