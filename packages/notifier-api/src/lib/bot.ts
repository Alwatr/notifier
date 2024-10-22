import {Bot} from 'grammy';

import {config, logger} from './config.js';

export const bot = new Bot(config.bot.token, {botInfo: config.bot.info});

bot.start({drop_pending_updates: config.bot.dropPendingUpdates});

bot.catch(async (err: { message: unknown; }) => {
  logger.error('catch', 'catch_error', err);
  // await notifyDebug(`❗️ [#catch_error]: ${err.message}`);
});
