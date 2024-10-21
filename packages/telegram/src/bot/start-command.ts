import {bot} from '../lib/bot.js';
import {config, logger} from '../lib/config.js';
import {message} from '../lib/i18n.js';
import {alwatrNitrobase} from '../lib/nitrobase.js';

import type {Group} from '../type.js';

/**
 * `start` command.
 *
 * This command starts the bot.
 */
bot.command('start', async (ctx) => {
  const chatId = ctx.chat.id;
  const groupId = ctx.match;
  logger.logMethodArgs?.('start-command', {chatId, groupId});

  if (!groupId) {
    await ctx.reply(message('private_bot_message'), {
      reply_parameters: {message_id: ctx.message!.message_id},
    });
    return;
  }

  const groupsCollection = await alwatrNitrobase.openCollection<Group>(config.nitrobase.groupsCollection);

  if (groupsCollection.hasItem(groupId) === false) {
    groupsCollection.addItem(groupId, {members: [chatId]});

    await ctx.reply(message('added_message'), {
      reply_parameters: {message_id: ctx.message!.message_id},
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
  else {
    const groupData = groupsCollection.getItemData(groupId);
    if (groupData.members.includes(chatId) === false) {
      groupData.members.push(chatId);
      groupsCollection.mergeItemData(groupId, groupData);

      await ctx.reply(message('added_message'), {
        reply_parameters: {message_id: ctx.message!.message_id},
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
    else {
      await ctx.reply(message('added_already_message'), {
        reply_parameters: {message_id: ctx.message!.message_id},
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
  }

  groupsCollection.save();
});
