import {bot} from '../lib/bot.js';
import {config} from '../lib/config.js';
import {message} from '../lib/i18n.js';
import {alwatrNitrobase} from '../lib/nitrobase.js';

bot.callbackQuery(/^unsubscribe:.*$/, async (ctx) => {
  const groupId = ctx.callbackQuery.data.split(':')[1];
  const userId = ctx.from.id + '';

  const groupsCollection = await alwatrNitrobase.openCollection<GroupItem>(config.nitrobase.groupsCollection);

  if (groupsCollection.hasItem(groupId) === false) {
    await ctx.reply(message('haveNotSubscribedBefore'));
    return;
  }

  const groupData = groupsCollection.getItemData(groupId);
  const targetIndex = groupData.memberList.findIndex(member => member.id === userId);
  if (targetIndex === -1) {
    await ctx.reply(message('haveNotSubscribedBefore'));
    return;
  }

  groupData.memberList.splice(targetIndex, 1);
  groupsCollection.mergeItemData(groupId, groupData);
  groupsCollection.save();

  await ctx.reply(message('hasBeenUnsubscribed').replace('{groupId}', groupId));
});

export const getUnsubscribeInlineKeyboardData = (groupId: string) => ({
  callback_data: `unsubscribe:${groupId}`,
  text: message('unsubscribeMeButtonLabel'),
});
