import './command/just-private.js';
// eslint-disable-next-line import/order
import './command/admin.js';
import './command/start-normal.js';
import {config} from './config.js';
import {startBot} from './lib/bot.js';
import {logger} from './lib/logger.js';

logger.banner(config.banner + ' - 🚀 Starting');

startBot();
