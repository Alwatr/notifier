import {AlwatrHashGenerator} from 'alwatr/nanotron';

import {config} from './config.js';

export const hashGenerator = /* #__PURE__ */ new AlwatrHashGenerator(config.hash);
