import {bot} from '../lib/bot.js';
import {config, logger} from '../lib/config.js';
import {message} from '../lib/i18n.js';
import {alwatrNitrobase} from '../lib/nitrobase.js';
import {escapeMessage} from '../lib/util.js';

import type {Group} from '../type.js';
import type {GrammyError} from 'grammy';

/**
 * Send a message to member of groupId.
 *
 * @param groupId - Group ID.
 * @param message_ - Message to send.
 */
export async function sendMessageToGroup(groupId: string, message_: string): Promise<void> {
  logger.logMethodArgs?.('sendMessageToGroup', {groupId});
  message_ = escapeMessage(message_);

  const groupsCollection = await alwatrNitrobase.openCollection<Group>(config.nitrobase.groupsCollection);

  if (groupsCollection.hasItem(groupId) === false) {
    return;
  }

  const groupData = groupsCollection.getItemData(groupId);

  for (const chatId of groupData.members) {
    try {
      await bot.api.sendMessage(chatId, message_, {
        parse_mode: 'MarkdownV2',
        reply_markup: {
          inline_keyboard: [
            [
              {
                callback_data: `unsubscribe:${groupId}`,
                text: message('unsubscribe_me_button'),
              },
            ],
          ],
        },
      });
    }
    catch (err) {
      const err_ = err as GrammyError;
      logger.error('sendMessage', 'error_send_message', err_, {chatId});

      // remove if blocked
      if (err_.error_code === 403) {
        groupData.members = groupData.members.filter((id) => id !== chatId);
        groupsCollection.mergeItemData(groupId, groupData);
        groupsCollection.save();
      }
    }
  }
}
