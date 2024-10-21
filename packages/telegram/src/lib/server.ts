import {NanotronApiServer} from 'alwatr/nanotron';

import {config} from './config.js';

export const nanotronApiServer = new NanotronApiServer(config.nanotronApiServer);
