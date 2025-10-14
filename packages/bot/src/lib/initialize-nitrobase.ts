import {config} from '../config.js';
import {nitrobase} from './nitrobase.js';

export function initializeNitrobase() {
  if (nitrobase.hasStore(config.nitrobase.categoryCollection) === false) {
    nitrobase.newCollection(config.nitrobase.categoryCollection);
  }
}
