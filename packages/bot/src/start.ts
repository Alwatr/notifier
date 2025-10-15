/* eslint-disable import/order */
import './command/just-private.js'; // must be first
import './command/admin.js'; // must be second
import './command/start-referral.js'; // must before start-normal
import './command/start-normal.js';
import './command/update-contact.js';
import './command/menu.js';

import {config} from './config.js';
import {startBot} from './lib/bot.js';
import {logger} from './lib/logger.js';

logger.banner(config.banner + ' - 🚀 Starting');

startBot();
