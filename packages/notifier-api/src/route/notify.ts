import {sendMessageToCategory} from '../bot/send-message.js';
import {logger} from '../lib/config.js';
import {parseBodyAsJson} from '../lib/pre-handlers/parse-request-body.js';
import {validateCategoryId} from '../lib/pre-handlers/validate-category-id.js';
import {nanotronApiServer} from '../lib/server.js';

nanotronApiServer.defineRoute<{body: { categoryId: string; message: string }}>({
  method: 'POST',
  url: '/telegram/notify',
  preHandlers: [parseBodyAsJson, validateCategoryId],
  async handler() {
    logger.logMethodArgs?.('defineRoute(/telegram/notify)', {body: this.sharedMeta.body});

    sendMessageToCategory(this.sharedMeta.body.categoryId, this.sharedMeta.body.message);

    this.serverResponse.replyJson({
      ok: true,
      data: {},
    });
  },
});
