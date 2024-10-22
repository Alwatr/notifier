import {bot} from '../lib/bot.js';
import {config, logger} from '../lib/config.js';
import {cryptoFactory} from '../lib/crypto.js';
import {message} from '../lib/i18n.js';
import {alwatrNitrobase} from '../lib/nitrobase.js';

/**
 * `new_category` command.
 *
 * This command creates a new category.
 */
bot.command('new_category', async (ctx) => {
  const chatId = ctx.chat.id;
  const categoryNameQueryParam = ctx.match;
  logger.logMethodArgs?.('new_category', {chatId, groupNameQueryParam: categoryNameQueryParam});

  if (chatId !== config.bot.adminChatId) {
    ctx.reply(message('commandAccessDenied'));
    return;
  }

  const categoryName = categoryNameQueryParam.split('?name=')[1];
  if (!categoryName) {
    ctx.reply(message('enterCategoryName'));
    return;
  }

  const categoriesCollection = await alwatrNitrobase.openCollection<CategoryItem>(config.nitrobase.categoriesCollection);
  const newCategoryId = cryptoFactory.generateUserId();
  categoriesCollection.addItem(newCategoryId, {
    categoryName,
    memberList: []
  });

  ctx.reply(`https://t.me/${config.bot.info.username}?start=${newCategoryId}`);
});
