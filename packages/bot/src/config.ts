import {getEnv} from 'alwatr/nanolib/node';
import {Region, StoreFileType, type AlwatrNitrobaseConfig, type StoreFileStat} from 'alwatr/nitrobase';

import {logger} from './lib/logger.js';

import type {PollingOptions, ApiClientOptions} from 'grammy';

const initializeMode = getEnv({name: 'initializeMode', defaultValue: ''}) !== '';

export const config = {
  banner: 'Telegram Referral Bot',
  initializeMode,

  adminUserNames: ['AliMD', 'wesun_sales'] as string[],
  referralRewardPerUser: 100_000,

  nitrobase: {
    config: {
      rootPath: getEnv({name: 'dbPath', developmentValue: './db'}),
      errorWhenNotInitialized: !initializeMode,
    } as Readonly<AlwatrNitrobaseConfig>,

    usersCollection: {
      name: 'user-list',
      region: Region.Managers,
      type: StoreFileType.Collection,
      schemaVer: 1,
    } as StoreFileStat,
  } as const,

  telegramBot: {
    token: getEnv({name: 'botToken'}),
    username: getEnv({name: 'botUsername', defaultValue: 'wesun_school_bot'}),
    clientOption: {} as ApiClientOptions,
    startOption: {
      drop_pending_updates: true,
      allowed_updates: ['message'],
    } as PollingOptions,
  } as const,
} as const;

__dev_mode__: logger.logProperty?.('config', config);
