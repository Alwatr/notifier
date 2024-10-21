import {bot} from '../lib/bot.js';
import {config, logger} from '../lib/config.js';
import {message} from '../lib/i18n.js';
import {alwatrNitrobase} from '../lib/nitrobase.js';

const getUnsubscribeInlineKeyboardData = (groupId: string) => ({
  callback_data: `unsubscribe:${groupId}`,
  text: message('unsubscribe_me_button'),
});

/**
 * `start` command.
 *
 * This command starts the bot.
 */
bot.command('start', async (ctx) => {
  const chatId = ctx.chat.id + '';
  const groupId = ctx.match;
  logger.logMethodArgs?.('start-command', {chatId, groupId});

  const unsubscribeInlineKeyboardData = getUnsubscribeInlineKeyboardData(groupId);

  if (groupId === undefined) {
    await ctx.reply(message('private_bot_message'), {
      reply_parameters: {message_id: ctx.message!.message_id},
    });

    return;
  }

  const groupsCollection = await alwatrNitrobase.openCollection<GroupItem>(config.nitrobase.groupsCollection);

  const newMember = {
    id: chatId,
    type: ctx.chat.type,
    first_name: ctx.chat.first_name,
    last_name: ctx.chat.last_name,
    username: ctx.chat.username
  }

  const groupData = groupsCollection.getItemData(groupId);
  const targetIndex = groupData.memberList.findIndex(member => member.id === chatId);
  if (targetIndex === -1) {
    groupData.memberList.push(newMember);
    groupsCollection.mergeItemData(groupId, groupData);
    groupsCollection.save();

    await ctx.reply(message('added_message'), {
      reply_parameters: {message_id: ctx.message!.message_id},
      reply_markup: {
        inline_keyboard: [
          [
            unsubscribeInlineKeyboardData
          ],
        ],
      },
    });

    return;
  }

  await ctx.reply(message('added_already_message'), {
    reply_parameters: {message_id: ctx.message!.message_id},
    reply_markup: {
      inline_keyboard: [
        [
          unsubscribeInlineKeyboardData
        ],
      ],
    },
  });
});
