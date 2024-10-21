import {createLogger, packageTracer} from 'alwatr/nanolib';
import {Region, StoreFileType, type AlwatrNitrobaseConfig, type StoreFileStat} from 'alwatr/nitrobase';

import type {CryptoFactoryConfig, NanotronApiServerConfig} from 'alwatr/nanotron';
import type {UserFromGetMe} from 'grammy/types';

__dev_mode__: packageTracer.add(__package_name__, __package_version__);

export const logger = /* #__PURE__ */ createLogger(__package_name__);

const env = /* #__PURE__ */ (() => {
  const devConfig = {
    dbPath: './db',
    tokenSecret: 'DEV_SECRET',
    host: '0.0.0.0',
    port: 8000,
    botToken: 'BOT_TOKEN',
    botUsername: 'BOT_USERNAME',
    botFirstName: 'BOT_FIRST_NAME',
    dropPendingUpdates: '1'
  } as const;

  const env_ = {
    ...process.env,
    ...(__dev_mode__ ? devConfig : {}),
  };

  for (const key in devConfig) {
    if (!Object.hasOwn(devConfig, key)) continue;
    if (!Object.hasOwn(env_, key)) throw new Error(`${key} required in production.`);
  }

  return env_;
})();

export const config = {
  token: {
    secret: env.tokenSecret!,
    duration: '1y',
  } as CryptoFactoryConfig,

  nanotronApiServer: {
    host: env.host!,
    port: +env.port!,
    prefix: '/api/',
    // allowAllOrigin: true,
  } as NanotronApiServerConfig,

  nitrobase: {
    config: {
      rootPath: env.dbPath!,
    } as AlwatrNitrobaseConfig,

    groupsCollection: {
      name: 'groups',
      region: Region.Managers,
      type: StoreFileType.Collection,
    } as StoreFileStat,
  } as const,

  bot: {
    token: env.botToken!,
    // adminChatId: +env.botAdminChatId!,
    // adminThreadId: +env.botAdminThreadId!,

    dropPendingUpdates: process.env.dropPendingUpdates === '1',

    info: {
      username: env.botUsername,
      can_join_groups: true,
      can_read_all_group_messages: false,
      first_name: env.botFirstName,
      is_bot: true,
      supports_inline_queries: false,
      language_code: 'fa',
    } as UserFromGetMe,
  } as const,

} as const;

__dev_mode__: logger.logProperty?.('config', config);

