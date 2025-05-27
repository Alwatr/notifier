import {
  createLogger,
  packageTracer,
  fetchJson,
  resolveUrl,
  type FetchOptions,
  type ResponseError,
} from '@alwatr/nanolib';

__dev_mode__: packageTracer.add(__package_name__, __package_version__);

type ApiResponseSuccess = {
  ok: true;
}

/**
 * Notify option interface.
 */
export interface NotifyOption {
  /**
   * Target for the notification.
   * Its not a specific user or group, but its a categoryId that you can use to filter specific targets.
   */
  target: string;

  /**
   * Message to send.
   */
  message: string;

  /**
   * Whether to send the message in markdown format.
   */
  markdown?: boolean;
}

/**
 * Alwatr notifier configuration interface.
 */
export interface AlwatrNotifierConfig {
  /**
   * API URL for the notifier service.
   */
  apiUrl: string;

  /**
   * Access token for the notifier service.
   */
  accessToken: string;

  /**
   * Fetch options for the API request.
   */
  fetchOption: Partial<FetchOptions>;
}

/**
 * Alwatr notifier class.
 *
 * @example
 * ```ts
 * import {AlwatrNotifier} from '@alwatr/notifier';
 *
 * const notifier = new AlwatrNotifier({
 *   apiUrl: 'https://notifier.alwatr.ir',
 *   accessToken: 'YOUR_ACCESS_TOKEN',
 * });
 *
 * notifier.notify({
 *   target: 'debug',
 *   message: 'Hello **world**!',
 *   markdown: true,
 * })
 * ```
 */
export class AlwatrNotifier {
  /**
   * Alwatr notifier configuration.
   */
  readonly config: AlwatrNotifierConfig;

  /**
   * Internal logger.
   */
  protected readonly logger_ = createLogger('notifier');

  constructor(config: AlwatrNotifierConfig) {
    this.config = config;
    this.logger_.logMethodArgs?.('new', {apiUrl: this.config.apiUrl});
  }

  private apiRoute__ = '/api/v2/notify';

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
  notify(option: NotifyOption): Promise<ResponseError | ApiResponseSuccess> {
    this.logger_.logMethodArgs?.('notify', option);

     return fetchJson({
      ...this.config.fetchOption,
      url: resolveUrl(this.config.apiUrl, this.apiRoute__),
      bearerToken: this.config.accessToken,
      bodyJson: {
        message: option.message,
        target: option.target,
        markdown: option.markdown === true,
      },
    })
  }
}
