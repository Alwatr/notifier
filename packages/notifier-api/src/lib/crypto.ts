import {AlwatrCryptoFactory} from 'alwatr/nanotron';

import {config} from './config.js';

export const cryptoFactory = /* #__PURE__ */ new AlwatrCryptoFactory(config.token);
