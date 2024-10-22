import {config} from './config.js';
import {alwatrNitrobase} from './nitrobase.js';

export function initializeNitrobase() {
  if (alwatrNitrobase.hasStore(config.nitrobase.categoriesCollection) === false) {
    alwatrNitrobase.newCollection(config.nitrobase.categoriesCollection);
  }
}
