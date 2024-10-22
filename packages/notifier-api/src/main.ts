import './bot/new-category-command.js';
import './bot/start-command.js';
import './bot/unsubscribe-callback.js';
import {logger} from './lib/config.js';
import {initializeNitrobase} from './lib/initialize-nitrobase.js';
import './route/home.js';
import './route/notify.js';

logger.banner('@alwatr/telegram-notifier');

initializeNitrobase();
