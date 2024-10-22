import {nanotronApiServer} from '../lib/server.js';

/**
 * GET `/` - Returns the welcome message.
 *
 * @returns `{app, message}` - An object with a welcome message and app name.
 */
nanotronApiServer.defineRoute({
  method: 'GET',
  url: '/',
  handler() {
    this.serverResponse.replyJson({
      ok: true,
      data: {
        app: '..:: Telegram Notifier ::..',
        message: 'Hello ;)',
      },
    });
  },
});
