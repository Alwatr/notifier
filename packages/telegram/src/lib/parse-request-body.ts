import {logger} from '../lib/config.js';

import type {NanotronClientRequest} from 'alwatr/nanotron';

export async function parseBodyAsJson<T extends DictionaryOpt = DictionaryOpt>(
  this: NanotronClientRequest<DictionaryOpt<T>>,
): Promise<void> {
  try {
    const bodyBuffer = await this.getBodyRaw();
    const data = JSON.parse(bodyBuffer.toString()) as T;
    logger.logMethodArgs?.('parseBodyAsJson', {data});

    this.sharedMeta.body = data;
  }
  catch (error) {
    logger.error?.('parseBodyAsJson', 'body_parsing_error', {error});
  }
}
