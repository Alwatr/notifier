/**
 * @see https://core.telegram.org/bots/api#markdownv2-style
 */
const scapeChars = ['_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!'];
const scapeCharsRegex = new RegExp(`[${scapeChars.map((char) => `\\${char}`).join('')}]`, 'g');

export function escapeMessage(message: string): string {
  return message.replace(scapeCharsRegex, '\\$&');
}
