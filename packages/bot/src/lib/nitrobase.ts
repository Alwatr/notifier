import {AlwatrNitrobase} from 'alwatr/nitrobase';

import {config} from '../config.js';

import type {Category} from '../type.js';

export const nitrobase = new AlwatrNitrobase(config.nitrobase.config);

export const openCategoryCollection = async () => await nitrobase.openCollection<Category>(config.nitrobase.categoryCollection);
