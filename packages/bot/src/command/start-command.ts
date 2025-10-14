import {logger} from '../config.js';
import {bot} from '../lib/bot.js';
import {message} from '../lib/message.js';
import {openCategoryCollection} from '../lib/nitrobase.js';

bot.command(
  'start',

  /**
   * Start command with category id as parameter.
   * Adds the user to the category members list.
   *
   * @example
   * `/start categoryId`
   * `https://t.me/your_bot?start=categoryId`
   */
  async function startCommand(ctx) {
    const categoryId = ctx.match;
    try {
      logger.logMethodArgs?.('startCommand', {categoryId, chat: ctx.chat});

      if (!categoryId) {
        logger.incident?.('startCommand', 'category_id_not_provided', {from: ctx.from, chat: ctx.chat});
        await ctx.reply(message.private_bot_warning, {
          reply_parameters: {
            message_id: ctx.msg.message_id,
          },
        });
        return;
      }

      const categoryCollection = await openCategoryCollection();

      if (categoryCollection.hasItem(categoryId) === false) {
        logger.incident?.('startCommand', 'category_not_found', {categoryId, from: ctx.from, chat: ctx.chat});
        await ctx.reply(message.invalid_data_submitted, {
          reply_parameters: {
            message_id: ctx.msg.message_id,
          },
        });
        return;
      }

      const members = categoryCollection.getItemData(categoryId).members;

      if (members.findIndex((member) => member.id === ctx.chat.id) !== -1) {
        await ctx.reply(message.already_added_to_list);
        return;
      }

      members.push({
        id: ctx.chat.id,
        type: ctx.chat.type,
        title: ctx.chat.title,
        firstName: ctx.chat.first_name,
        lastName: ctx.chat.last_name,
        username: ctx.chat.username,
      });
      categoryCollection.save();

      await ctx.reply(message.success_added_to_list);
    }
    catch (error) {
      logger.error?.('startCommand', 'unexpected_error', error, {categoryId, from: ctx.from, chat: ctx.chat});
    }
  },
);
