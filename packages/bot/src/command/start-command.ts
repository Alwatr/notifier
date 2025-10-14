import {toNumber} from 'alwatr/nanolib';

import {bot} from '../lib/bot.js';
import {logger} from '../lib/logger.js';
import {message} from '../lib/message.js';
import {openUserCollection} from '../lib/nitrobase.js';

bot.command(
  'start',

  /**
   * Start command with category id as parameter.
   * Adds the user to the category members list.
   *
   * @example
   * `/start referId`
   * `https://t.me/your_bot?start=referId`
   * `tg://resolve?domain=your_bot&start=referId`
   */
  async function startCommand(ctx) {
    let referUserId = toNumber(ctx.match);
    const chat = ctx.chat;

    try {
      logger.logMethodArgs?.('startCommand', {referUserId, chat});

      if (ctx.chat.type !== 'private') {
        logger.incident?.('startCommand', 'invalid_chat_type', chat);
        await ctx.reply(message.command_available_in_private_chat_only);
        return;
      }

      const from = ctx.chat;

      const userCollection = await openUserCollection();

      // validate referUserId
      if (referUserId !== null) {
        if (userCollection.hasItem(referUserId) === false) {
          logger.accident?.('startCommand', 'user_not_found', {referUserId, from, chat});
          referUserId = null;
        }
      }

      // add or update user data
      userCollection.replaceItemData(from.id, {
        id: from.id,
        username: from.username,
        firstName: from.first_name!,
        lastName: from.last_name,
        referUserId,
      });

      // notify refer user
      if (referUserId !== null) {
        const referUser = userCollection.getItemData(referUserId);

        void bot.api.sendMessage(
          referUser.id,
          message.new_refer_user.replace('{user}', `${from.first_name} ${from.last_name ?? ''} (@${from.username ?? '---'})`),
        );
      }

      await ctx.reply(message.registerSuccess.replace('{firstName}', from.first_name));
    }
    catch (error) {
      logger.error?.('startCommand', 'unexpected_error', error, {referUserId, chat, from: ctx.from});
    }
  },
);
