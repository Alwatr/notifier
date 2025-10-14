import {createLogger} from 'alwatr/nanolib';

import {config} from './config.js';
import {nitrobase} from './lib/nitrobase.js';

async function initialize() {
  const logger = createLogger(__package_name__, true);
  logger.banner(config.banner + ' - Initializing');

  if (config.initializeMode === false) {
    logger.accident('initialize', 'initialize_mode_is_off');
    return;
  }

  logger.logStep?.('initialize', 'creating_user_list_collection');
  nitrobase.newCollection(config.nitrobase.usersCollection);
}

initialize();
