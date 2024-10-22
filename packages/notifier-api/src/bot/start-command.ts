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

  if (!categoryId) {
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

  const categoryData = categoriesCollection.getItemData(categoryId);
  const targetIndex = categoryData.memberList.findIndex(member => member.id === chatId);
  if (targetIndex === -1) {
    categoryData.memberList.push(newMember);
    categoriesCollection.mergeItemData(categoryId, categoryData);
    categoriesCollection.save();

    await ctx.reply(message('addedToList'));
    return;
  }

  await ctx.reply(message('hasBeenAddedAlready'));
});
