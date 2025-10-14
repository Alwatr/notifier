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
    let referralUserId = toNumber(ctx.match);
    const chat = ctx.chat;
    logger.logMethodArgs?.('startCommand', {referUserId: referralUserId, chat});

    try {
      if (ctx.chat.type !== 'private') {
        logger.incident?.('startCommand', 'invalid_chat_type', chat);
        await ctx.reply(message.command_available_in_private_chat_only);
        return;
      }

      const from = ctx.chat;

      const userCollection = await openUserCollection();

      if (userCollection.hasItem(from.id)) {
        await ctx.reply(message.alreadyRegistered.replace('{firstName}', from.first_name));
        return;
      }
      // else

      // validate referUserId
      if (referralUserId !== null) {
        if (userCollection.hasItem(referralUserId) === false) {
          logger.accident?.('startCommand', 'user_not_found', {referUserId: referralUserId, from, chat});
          referralUserId = null;
        }
      }

      // TODO: get user phone and real name

      // add or update user data
      userCollection.addItem(from.id, {
        id: from.id,
        username: from.username,
        firstName: from.first_name!,
        lastName: from.last_name,
        invitedBy: referralUserId,
        referralCount: 0,
      });

      // notify refer user
      if (referralUserId !== null) {
        const referralUser = userCollection.getItemData(referralUserId);
        referralUser.referralCount++;
        userCollection.save(referralUser.id);

        void bot.api.sendMessage(
          referralUser.id,
          message.new_refer_user
            .replace('{user}', `${from.first_name} ${from.last_name ?? ''} (@${from.username ?? '---'})`)
            .replace('{count}', referralUser.referralCount + ''),
        );
      }

      await ctx.reply(message.registerSuccess.replace('{firstName}', from.first_name));
    }
    catch (error) {
      logger.error?.('startCommand', 'unexpected_error', error, {referUserId: referralUserId, chat, from: ctx.from});
    }
  },
);
