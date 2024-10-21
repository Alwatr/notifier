/**
 * @see https://core.telegram.org/bots/api#markdownv2-style
 */
const scapeChars = ['_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!'];

export function escapeMessage(message: string): string {
  for (const character of scapeChars) {
    message = message.replaceAll(character, `\\${character}`);
  }
  return message;
}
