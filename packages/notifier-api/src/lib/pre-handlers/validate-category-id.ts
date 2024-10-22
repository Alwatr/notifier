import {config, logger} from '../config.js';
import {hashGenerator} from '../hash.js';
import {alwatrNitrobase} from '../nitrobase.js';

import type {ErrorResponse, NanotronClientRequest} from 'alwatr/nanotron';

export async function validateCategoryId<T extends DictionaryOpt = DictionaryOpt>(
  this: NanotronClientRequest<DictionaryOpt<T>>,
): Promise<void> {
  try {
    logger.logMethodArgs?.('validateCategoryId', {body: this.sharedMeta.body});

    if (this.sharedMeta.body === undefined) {
      this.serverResponse.replyErrorResponse({
        ok: false,
        errorCode: 'invalid_request_payload',
        errorMessage: 'Invalid request payload.'
      });
      return;
    }

    const replyErrorResponse: ErrorResponse = {
      ok: false,
      errorCode: 'invalid_category_id',
      errorMessage: 'Invalid category.'
    };

    if (hashGenerator.verifySelfValidate(this.sharedMeta.body.categoryId) === false) {
      this.serverResponse.replyErrorResponse(replyErrorResponse);
      return;
    }

    const categoriesCollection = await alwatrNitrobase.openCollection<CategoryItem>(config.nitrobase.categoriesCollection);
    if (categoriesCollection.hasItem(this.sharedMeta.body.categoryId) === false) {
      this.serverResponse.replyErrorResponse(replyErrorResponse);
    }
  }
  catch (error) {
    logger.error?.('validateCategoryId', 'validating_category_id_error', {error});
  }
}
