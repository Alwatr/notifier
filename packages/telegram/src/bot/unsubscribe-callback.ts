import {bot} from '../lib/bot.js';
import {config} from '../lib/config.js';
import {message} from '../lib/i18n.js';
import {alwatrNitrobase} from '../lib/nitrobase.js';

import type {Group} from '../type.js';

bot.callbackQuery(/^unsubscribe:.*$/, async (ctx) => {
  const groupId = ctx.callbackQuery.data.split(':')[1];
  const userId = ctx.from.id;

  const groupsCollection = await alwatrNitrobase.openCollection<Group>(config.nitrobase.groupsCollection);

  if (groupsCollection.hasItem(groupId) === false) {
    await ctx.reply(message('you_not_subscribed_before'));
    return;
  }

  const groupData = groupsCollection.getItemData(groupId);

  if (groupData.members.includes(userId) === false) {
    await ctx.reply(message('you_not_subscribed_before'));
    return;
  }

  groupData.members = groupData.members.filter((id) => id !== userId);
  groupsCollection.mergeItemData(groupId, groupData);
  groupsCollection.save();

  await ctx.reply(message('unsubscribe_message').replace('{groupId}', groupId));
});
