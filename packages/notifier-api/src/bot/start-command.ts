import {getUnsubscribeInlineKeyboardData} from './unsubscribe-callback.js';
import {bot} from '../lib/bot.js';
import {config, logger} from '../lib/config.js';
import {message} from '../lib/i18n.js';
import {alwatrNitrobase} from '../lib/nitrobase.js';


/**
 * `start` command.
 *
 * This command starts the bot.
 */
bot.command('start', async (ctx) => {
  const chatId = ctx.chat.id + '';
  const categoryId = ctx.match;
  logger.logMethodArgs?.('start-command', {chatId, categoryId});

  const unsubscribeInlineKeyboardData = getUnsubscribeInlineKeyboardData(categoryId);

  if (categoryId === undefined) {
    await ctx.reply(message('itIsPrivateBot'), {
      reply_parameters: {message_id: ctx.message!.message_id},
    });

    return;
  }

  const categoriesCollection = await alwatrNitrobase.openCollection<CategoryItem>(config.nitrobase.categoriesCollection);

  const newMember = {
    id: chatId,
    type: ctx.chat.type,
    first_name: ctx.chat.first_name,
    last_name: ctx.chat.last_name,
    username: ctx.chat.username
  }

  const groupData = categoriesCollection.getItemData(categoryId);
  const targetIndex = groupData.memberList.findIndex(member => member.id === chatId);
  if (targetIndex === -1) {
    groupData.memberList.push(newMember);
    categoriesCollection.mergeItemData(categoryId, groupData);
    categoriesCollection.save();

    await ctx.reply(message('addedToList'), {
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

  await ctx.reply(message('hasBeenAddedAlready'), {
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
