import {createLogger} from 'alwatr/nanolib';

import {config} from './config.js';
import {userCollection} from './lib/users-collection.js';

async function migrate() {
  const logger = createLogger(__package_name__, true);
  logger.banner(config.banner + ' - 🔄 Migrating');

  let effected = 0;
  for (const user of userCollection.items()) {
    if (!user.data.courses) {
      effected++;
      user.data.courses = {
        symphonyInterest: true,
        symphonyGroup: false,
        symphonyPaid: false,
      };
      logger.logStep?.('Migrating', `User ${user.meta.id} migrated`);
    }
  }

  if (effected > 0) {
    userCollection.saveImmediate(null);
  }

  logger.logStep?.('Migrating', 'Done ✅');
}

migrate();
