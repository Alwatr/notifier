import {AlwatrNitrobase} from 'alwatr/nitrobase';

import {config} from '../config.js';

export const nitrobase = /* #__PURE__ */ new AlwatrNitrobase(config.nitrobase.config);
