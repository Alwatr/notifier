import {nanotronApiServer} from '../lib/server.js';

nanotronApiServer.defineRoute({
  method: 'GET',
  url: '/',
  handler() {
    this.serverResponse.headers['content-type'] = 'application/json';
    this.serverResponse.reply(`{
      "ok": true,
      "data": {
        "app": "..:: Telegram Notifier ::..",
        "message": "Hello ;)"
      }
    }`);
  },
});
