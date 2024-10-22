import {bot} from '../lib/bot.js';
import {config, logger} from '../lib/config.js';
import {cryptoFactory} from '../lib/crypto.js';
import {message} from '../lib/i18n.js';
import {alwatrNitrobase} from '../lib/nitrobase.js';

/**
 * `new_group` command.
 *
 * This command creates a new group.
 */
bot.command('new_group', async (ctx) => {
  const chatId = ctx.chat.id;
  const groupNameQueryParam = ctx.match;
  logger.logMethodArgs?.('new_group', {chatId, groupNameQueryParam});

  if (chatId !== config.bot.adminChatId) {
    ctx.reply(message('commandAccessDenied'));
    return;
  }

  const groupName = groupNameQueryParam.split('?name=')[1];
  if (!groupName) {
    ctx.reply(message('enterGroupName'));
    return;
  }

  const groupsCollection = await alwatrNitrobase.openCollection<GroupItem>(config.nitrobase.groupsCollection);
  const newGroupId = cryptoFactory.generateUserId();
  groupsCollection.addItem(newGroupId, {
    categoryName: groupName,
    memberList: []
  });

  ctx.reply(`https://t.me/${config.bot.info.username}?start=${newGroupId}`);
});
