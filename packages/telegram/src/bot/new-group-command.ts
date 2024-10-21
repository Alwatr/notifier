import {bot} from '../lib/bot.js';
import {config, logger} from '../lib/config.js';
import { cryptoFactory } from '../lib/crypto.js';
import { alwatrNitrobase } from '../lib/nitrobase.js';
// import {message} from '../lib/i18n.js';
// import {alwatrNitrobase} from '../lib/nitrobase.js';

/**
 * `new_group` command.
 *
 * This command creates a new group.
 */
bot.command('new_group', async (ctx) => {
  // FIXME: Check admin access

  const chatId = ctx.chat.id + '';
  const groupNameQueryParam = ctx.match;
  logger.logMethodArgs?.('new_group', {chatId, groupNameQueryParam});

  const groupName = groupNameQueryParam.split('?name=')[1];
  if (!groupName) {
    ctx.reply('لطفا نام گروه را مشخص کنید.');
    return;
  }

  const groupsCollection = await alwatrNitrobase.openCollection<GroupItem>(config.nitrobase.groupsCollection);
  const newGroupId = cryptoFactory.generateUserId();
  groupsCollection.addItem(newGroupId, {
    categoryName: groupName,
    memberList: []
  });

  ctx.reply('https://t.me/MHF_DEV_BOT?start=' + newGroupId);
});
