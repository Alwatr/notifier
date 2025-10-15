import './command/just-private.js';
import './command/start-normal.js';
import {config} from './config.js';
import {startBot} from './lib/bot.js';
import {logger} from './lib/logger.js';

logger.banner(config.banner + ' - 🚀 Starting');

startBot();
