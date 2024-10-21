/* eslint-disable max-len */

export function message(key: keyof typeof i18nResources): string {
  return i18nResources[key];
}

const i18nResources = {
  added_message: 'شما با موفقیت به لیست اضافه شدید',
  added_already_message: 'شما قبلا به این لیست اضافه شده اید.',
  unsubscribe_me_button: 'لغو عضویت از این لیست 🔕',
  unsubscribe_message: 'شما از لیست {groupId} حذف شدید 🚫',
  you_not_subscribed_before: 'شما قبلا عضو این لیست نبوده اید!',

  startup_message: `Bot started \n\nv${__package_version__}`,
  private_bot_message: 'این یک بات خصوصی هست! لطفا مزاحم نشوید',
} as const;
