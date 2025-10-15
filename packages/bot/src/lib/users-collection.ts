import {config} from '../config.js';
import {nitrobase} from './nitrobase.js';

import type {User} from './type.js';

export const userCollection = await nitrobase.openCollection<User>(config.nitrobase.usersCollection);
