export function replaceString(template: string, replaceArgs?: DictionaryReq<string>): string {
  let result = template;
  if (!replaceArgs) return result;
  for (const [key, value] of Object.entries(replaceArgs)) {
    result = result.replace(`{${key}}`, value);
  }
  return result;
}
