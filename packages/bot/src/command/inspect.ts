import {bot} from '../lib/bot.js';
import {logger} from '../lib/logger.js';

bot.on('message', async (ctx, next) => {
  logger.logMethodArgs?.('message', ctx.message);
  next();
});
