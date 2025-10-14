import {getEnv} from '@alwatr/env';
import {createLogger} from 'alwatr/nanolib';
import {Region, StoreFileType, type AlwatrNitrobaseConfig, type StoreFileStat} from 'alwatr/nitrobase';

import type {PollingOptions, ApiClientOptions} from 'grammy';

export const logger = /* #__PURE__ */ createLogger(__package_name__);

const initializeMode = getEnv({name: 'initializeMode', defaultValue: ''}) !== '';

export const config = {
  nitrobase: {
    config: {
      rootPath: getEnv({name: 'dbPath', developmentValue: './db'}),
      errorWhenNotInitialized: !initializeMode,
    } as Readonly<AlwatrNitrobaseConfig>,

    userList: {
      name: 'user-list',
      region: Region.Managers,
      type: StoreFileType.Collection,
    } as StoreFileStat,
  } as const,

  telegramBot: {
    token: getEnv({name: 'botToken'}),
    clientOption: {} as ApiClientOptions,
    startOption: {
      drop_pending_updates: true,
      allowed_updates: ['message'],
    } as PollingOptions,
  } as const,
} as const;

__dev_mode__: logger.logProperty?.('config', config);
