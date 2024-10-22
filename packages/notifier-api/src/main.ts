import './bot/new-category-command.js';
import './bot/start-command.js';
import {logger} from './lib/config.js';
import {initializeNitrobase} from './lib/initialize-nitrobase.js';
import './route/home.js';
import './route/notify.js';

logger.banner('@alwatr/notifier-api');

initializeNitrobase();
