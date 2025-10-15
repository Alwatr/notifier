import './command/inspect.js';
import './command/start-command.js';
import {config} from './config.js';
import {startBot} from './lib/bot.js';
import {logger} from './lib/logger.js';

logger.banner(config.banner + ' - 🚀 Starting');

startBot();
