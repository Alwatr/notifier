import {
  createLogger,
  packageTracer,
  fetchJson,
  resolveUrl,
  type FetchOptions,
  type ResponseError,
  type ResponseSuccess,
} from '@alwatr/nanolib';

__dev_mode__: packageTracer.add(__package_name__, __package_version__);

const logger = /* #__PURE__ */ createLogger(__package_name__);

/**
 * Notify option interface.
 */
export interface NotifyOption {
  /**
   * Category ID for the notification.
   *
   * @default 'demo'
   */
  categoryId?: string;

  /**
   * Whether to send the message in markdown format.
   */
  markdown?: boolean;

  /**
   * Fetch options for the API request.
   */
  fetchOption?: Partial<FetchOptions>;
}

/**
 * Alwatr notifier configuration interface.
 */
export interface AlwatrNotifierConfig extends NotifyOption {
  /**
   * API URL for the notifier service.
   *
   * @default 'https//notifier.alwatr.ir'
   */
  apiUrl?: string;

  /**
   * Access token for the notifier service.
   */
  accessToken: string;

  /**
   * Category ID for the notification.
   */
  categoryId: string;
}

/**
 * Alwatr notifier class.
 *
 * @example
 * ```ts
 * const notifier = new AlwatrNotifier({
 *   accessToken: 'YOUR_ACCESS_TOKEN',
 * });
 *
 * notifier.notify('Hello world!');
 * ```
 */
export class AlwatrNotifier {
  /**
   * Alwatr notifier configuration.
   */
  readonly config: Required<AlwatrNotifierConfig>;

  /**
   * Internal logger.
   */
  protected readonly logger_ = createLogger('notifier');

  /**
   * Create a new Alwatr notifier instance.
   *
   * @param config - Alwatr notifier configuration.
   *
   * @example
   * ```ts
   * const notifier = new AlwatrNotifier({
   *   categoryId: 'YOUR_CATEGORY_ID',
   *   accessToken: 'YOUR_ACCESS_TOKEN',
   * });
   *
   * notifier.notify('Hello world!');
   * ```
   */
  constructor(config: AlwatrNotifierConfig) {
    this.config = {
      apiUrl: 'https//notifier.alwatr.ir',
      markdown: false,
      ...config,

      fetchOption: {
        method: 'POST',
        ...config.fetchOption,
      },
    };
    this.logger_.logMethodArgs?.('new', {config: this.config});
  }

  /**
   * Send a notification.
   *
   * @param message - The message to send.
   * @param option - Notify options.
   * @returns A promise that resolves with the API response.
   *
   * @example
   * ```ts
   * notifier.notify('Hello world!');
   * ```
   *
   * @example
   * ```ts
   * notifier.notify('## Hello world\!', {
   *   categoryId: 'my-category',
   *   markdown: true,
   * });
   * ```
   */
  notify(message: string, option?: NotifyOption): Promise<ResponseError | ResponseSuccess<JsonObject>> {
    logger.logMethodArgs?.('notify', {message, option});

    const option_: Required<AlwatrNotifierConfig> = {
      ...this.config,
      ...option,
      fetchOption: {
        ...this.config.fetchOption,
        ...option?.fetchOption,
      },
    };

    if (option_.apiUrl.slice(-1) === '/') {
      option_.apiUrl = option_.apiUrl.slice(0, -1);
    }

    return fetchJson({
      ...option_.fetchOption,
      url: resolveUrl(option_.apiUrl, '/api/v2/notify'),
      bearerToken: option_.accessToken,
      bodyJson: {
        message,
        categoryId: option_.categoryId,
        markdown: option_.markdown === true,
      },
    } as FetchOptions);

  }
}
