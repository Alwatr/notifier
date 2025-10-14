import {HttpStatusCodes, parseBodyAsJson, requireAccessToken, type NanotronClientRequest} from 'alwatr/nanotron';

import {config, logger} from '../config.js';
import {openCategoryCollection} from '../lib/nitrobase.js';
import {nanotronApiServer} from '../lib/server.js';
import {telegramNotify, type TelegramNotifyOption} from '../lib/telegram-notify.js';

nanotronApiServer.defineRoute<{body: TelegramNotifyOption}>({
  method: 'POST',
  url: '/notify',
  preHandlers: [requireAccessToken(config.accessToken), parseBodyAsJson, notifyValidation],
  async handler() {
    logger.logMethod?.('notifyRoute');

    const notifyOption = this.sharedMeta.body;
    telegramNotify(notifyOption); // no need to await

    this.serverResponse.replyJson({
      ok: true,
    });
  },
});

export async function notifyValidation(this: NanotronClientRequest<{body: JsonObject}>): Promise<void> {
  const {categoryId, message, markdown} = this.sharedMeta.body;

  logger.logMethodArgs?.('notifyValidation', {categoryId, message, markdown});

  if (categoryId === undefined || typeof categoryId !== 'string') {
    this.serverResponse.statusCode = HttpStatusCodes.Error_Client_400_Bad_Request;
    this.serverResponse.replyErrorResponse({
      ok: false,
      errorCode: 'category_required',
      errorMessage: 'Category is required.',
    });
    return;
  }

  if (message === undefined || typeof message !== 'string') {
    this.serverResponse.statusCode = HttpStatusCodes.Error_Client_400_Bad_Request;
    this.serverResponse.replyErrorResponse({
      ok: false,
      errorCode: 'message_required',
      errorMessage: 'Message is required.',
    });
    return;
  }

  const categoryCollection = await openCategoryCollection();

  if (categoryCollection.hasItem(categoryId) === false) {
    this.serverResponse.statusCode = HttpStatusCodes.Error_Client_400_Bad_Request;
    this.serverResponse.replyErrorResponse({
      ok: false,
      errorCode: 'category_not_found',
      errorMessage: `Category ${categoryId} not found.`,
    });
    return;
  }

  // just for type validation and cleanup extra
  (this.sharedMeta.body as TelegramNotifyOption) = {
    categoryId,
    message,
    markdown: markdown === true,
  };
}
