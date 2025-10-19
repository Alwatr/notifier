import {toNumber} from 'alwatr/nanolib';

import {bot} from '../lib/bot.js';
import {logger} from '../lib/logger.js';
import {mainMenu} from '../lib/menu.js';
import {messages} from '../lib/message.js';
import {sendMessage} from '../lib/send-message.js';
import {userCollection} from '../lib/users-collection.js';

bot.command(
  'start',

  /**
   * Normal start command with referral id as parameter.
   *
   * @example
   * `/start ref_userId`
   * `https://t.me/your_bot?start=ref_userId`
   * `tg://resolve?domain=your_bot&start=ref_userId`
   */
  async (ctx, next) => {
    const {chat, from} = ctx;

    if (!from || !ctx.match || !ctx.match.startsWith('ref_')) {
      return next();
    }

    try {
      const referralUserId = toNumber(ctx.match.substring(4));

      logger.logMethodArgs?.('command_start_ref', {referralUserId, from});

      // validate referUserId
      if (referralUserId === null || !userCollection.hasItem(referralUserId)) {
        logger.accident?.('command_start_ref', 'user_not_found', {referralUserId, from});
        return next();
      }

      const vars = {
        name: `${from.first_name} ${from.last_name ?? ''}`.trim(),
      };

      if (userCollection.hasItem(from.id) && userCollection.getItemData(from.id).phone) {
        await sendMessage({
          chatId: chat.id,
          messages: messages.already_registered,
          vars,
          reply_markup: mainMenu,
        });
        return;
      }
      // else

      if (!userCollection.hasItem(from.id)) {
        // Save user data
        userCollection.addItem(from.id, {
          id: from.id,
          firstName: from.first_name,
          lastName: from.last_name ?? '',
          username: from.username ?? null,
          phone: null,
          invitedBy: referralUserId,
          referralCount: 0,
          blocked: false,
        });
      }

      // notify refer user
      const referralUser = userCollection.getItemData(referralUserId);
      referralUser.referralCount++;
      userCollection.save(referralUser.id);

      void sendMessage({
        chatId: referralUserId,
        messages: messages.new_referral_user,
        reply_markup: mainMenu,
        vars: {
          name: vars.name,
          referral_count: referralUser.referralCount.toString(),
        },
      });

      await sendMessage({
        chatId: chat.id,
        messages: messages.request_contact,
        vars,
      });
    }
    catch (error) {
      logger.error?.('startCommand', 'unexpected_error', error, {chat, from});
    }
  },
);
