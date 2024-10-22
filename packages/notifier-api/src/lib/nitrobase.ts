import {AlwatrNitrobase} from 'alwatr/nitrobase';

import {config} from './config.js';

export const alwatrNitrobase = new AlwatrNitrobase(config.nitrobase.config);
