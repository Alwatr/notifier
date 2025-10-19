import {bot} from '../lib/bot.js';
import {logger} from '../lib/logger.js';
import {messages} from '../lib/message.js';
import {sendMessage} from '../lib/send-message.js';
import {userCollection} from '../lib/users-collection.js';

bot.command(
  'start',

  /**
   * Normal start command without parameters.
   */
  async (ctx, next) => {
    const {chat, from} = ctx;

    if (!from) {
      return next();
    }

    logger.logMethodArgs?.('command_start_normal', from);

    const vars = {
      name: `${from.first_name} ${from.last_name ?? ''}`.trim(),
    };

    try {
      if (userCollection.hasItem(from.id) && userCollection.getItemData(from.id).phone) {
        // user already registered
        await sendMessage({
          chatId: chat.id,
          messages: messages.already_registered,
          vars,
        });
        return;
      }
      // else

      if (!userCollection.hasItem(from.id)) {
        // New user, save user data

        userCollection.addItem(from.id, {
          id: from.id,
          firstName: from.first_name,
          lastName: from.last_name ?? '',
          username: from.username ?? null,
          phone: null,
          invitedBy: null,
          referralCount: 0,
          blocked: false,
          courses: {
            symphonyInterest: true,
            symphonyGroup: false,
            symphonyPaid: false,
          },
        });
      }

      await sendMessage({
        chatId: chat.id,
        messages: messages.request_contact,
        vars,
      });
    }
    catch (error) {
      logger.error?.('command_start_normal', 'unexpected_error', error, {chat, from});
    }
  },
);
