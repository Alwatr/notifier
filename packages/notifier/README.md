# Alwatr Notifier

[![npm version](https://img.shields.io/npm/v/@alwatr/notifier.svg?style=flat-square)](https://www.npmjs.com/package/@alwatr/notifier)
[![GitHub issues](https://img.shields.io/github/issues/alwatr/notifier.svg?style=flat-square)](https://github.com/alwatr/notifier/issues)
[![GitHub stars](https://img.shields.io/github/stars/alwatr/notifier.svg?style=flat-square)](https://github.com/alwatr/notifier/stargazers)
[![GitHub license](https://img.shields.io/github/license/alwatr/notifier.svg?style=flat-square)](https://github.com/alwatr/notifier/blob/master/LICENSE)

A tiny and easy-to-use package for sending notifications to Alwatr Notifier service.

## Installation

```bash
npm install @alwatr/notifier
```

## Usage

```ts
import {AlwatrNotifier} from '@alwatr/notifier';

const notifier = new AlwatrNotifier({
  apiUrl: 'https://notifier.alwatr.ir',
  accessToken: 'YOUR_ACCESS_TOKEN',
});

notifier.notify({
  target: 'debug',
  message: 'Hello **world**!',
  markdown: true,
})
```

## API

### `AlwatrNotifier(config)`

Creates a new `AlwatrNotifier` instance.

**Parameters:**

- `config`: `AlwatrNotifierConfig` - The configuration for the notifier.

  - `apiUrl`: `string` - The API URL for the notifier service. (default: 'https//notifier.alwatr.ir')
  - `accessToken`: `string` - The access token for the notifier service.
  - `categoryId`: `string` - The category ID for the notification. (default: 'demo')
  - `markdown`: `boolean` - Whether to send the message in markdown format. (default: false)
  - `fetchOption`: `Partial<FetchOptions>` - Fetch options for the API request. (default: `{method: 'POST'}`)

**Example:**

```ts
const notifier = new AlwatrNotifier({
  categoryId: 'YOUR_CATEGORY_ID',
  accessToken: 'YOUR_ACCESS_TOKEN',
});
```

### `notify(message, option?)`

Sends a notification to the Alwatr Notifier service.

**Parameters:**

- `message`: `string` - The message to send.

- `option`: `NotifyOption` - Optional parameters for the notification.

  - `categoryId`: `string` - The category ID for the notification.
  - `markdown`: `boolean` - Whether to send the message in markdown format.
  - `fetchOption`: `Partial<FetchOptions>` - Fetch options for the API request.

**Returns:**

- `Promise<ResponseError | ResponseSuccess<JsonObject>>` - A promise that resolves with the API response.

**Example:**

```ts
notifier.notify('Hello world!');
```

**Example with options:**

```ts
notifier.notify('## Hello world\!', {
  categoryId: 'my-category',
  markdown: true,
});
```

### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.

### License

This project is licensed under the [AGPL-3.0 License](LICENSE).
