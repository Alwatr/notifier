import {Bot} from 'grammy';

import {config, logger} from '../config.js';

export const bot = new Bot(config.telegramBot.token, {client: config.telegramBot.clientOption});

export async function startBot() {
  await bot.api.setMyCommands([
    { command: 'start', description: 'Start the bot' },
    { command: 'help', description: 'Show help text' },
    { command: 'settings', description: 'Open settings' },
  ]);

  bot.start({
    ...config.telegramBot.startOption,
    onStart(botInfo) {
      logger.logProperty?.('botInfo', botInfo);
    },
  });

  bot.catch(async (error) => {
    logger.error('bot.catch', 'unexpected_error', error);
  });
}
