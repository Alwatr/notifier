import {sendMessageToGroup} from '../bot/send-message.js';
import {logger} from '../lib/config.js';
import {parseBodyAsJson} from '../lib/parse-request-body.js';
import {nanotronApiServer} from '../lib/server.js';

nanotronApiServer.defineRoute<{body: { groupId: string; message: string }}>({
  method: 'POST',
  url: '/telegram/notify',
  preHandlers: [parseBodyAsJson],
  async handler() {
    logger.logMethodArgs?.('defineRoute(/telegram/notify)', {body: this.sharedMeta.body});

    await sendMessageToGroup(this.sharedMeta.body.groupId, this.sharedMeta.body.message);

    this.serverResponse.replyJson({
      ok: true,
      data: {},
    });
  },
});
