import {AlwatrNitrobase} from 'alwatr/nitrobase';

import {config} from '../config.js';

import type {User} from './type.js';

export const nitrobase = /* #__PURE__ */ new AlwatrNitrobase(config.nitrobase.config);

export const openUserCollection = /* #__PURE__ */ () => nitrobase.openCollection<User>(config.nitrobase.usersCollection);
