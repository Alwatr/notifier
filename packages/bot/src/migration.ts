import {config} from './config.js';
import {logger} from './lib/logger.js';

logger.banner(config.banner + ' - 🔄 Migrating');

logger.logStep?.('Migrating', 'Done ✅');
