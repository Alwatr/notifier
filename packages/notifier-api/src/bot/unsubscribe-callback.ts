import {bot} from '../lib/bot.js';
import {config} from '../lib/config.js';
import {message} from '../lib/i18n.js';
import {alwatrNitrobase} from '../lib/nitrobase.js';

bot.callbackQuery(/^unsubscribe:.*$/, async (ctx) => {
  const categoryId = ctx.callbackQuery.data.split(':')[1];
  const userId = ctx.from.id + '';

  const categoriesCollection = await alwatrNitrobase.openCollection<CategoryItem>(config.nitrobase.categoriesCollection);

  if (categoriesCollection.hasItem(categoryId) === false) {
    await ctx.reply(message('haveNotSubscribedBefore'));
    return;
  }

  const categoryData = categoriesCollection.getItemData(categoryId);
  const targetIndex = categoryData.memberList.findIndex(member => member.id === userId);
  if (targetIndex === -1) {
    await ctx.reply(message('haveNotSubscribedBefore'));
    return;
  }

  categoryData.memberList.splice(targetIndex, 1);
  categoriesCollection.mergeItemData(categoryId, categoryData);
  categoriesCollection.save();

  await ctx.reply(message('hasBeenUnsubscribed').replace('{categoryId}', categoryId));
});

export const getUnsubscribeInlineKeyboardData = (groupId: string) => ({
  callback_data: `unsubscribe:${groupId}`,
  text: message('unsubscribeMeButtonLabel'),
});
