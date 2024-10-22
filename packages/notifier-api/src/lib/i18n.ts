/* eslint-disable max-len */

export function message(key: keyof typeof i18nResources): string {
  return i18nResources[key];
}

const i18nResources = {
  addedToList: 'شما با موفقیت به لیست اضافه شدید',
  hasBeenAddedAlready: 'شما قبلا به این لیست اضافه شده اید.',
  unsubscribeMeButtonLabel: 'لغو عضویت از این لیست 🔕',
  hasBeenUnsubscribed: 'شما از لیست {groupId} حذف شدید 🚫',
  haveNotSubscribedBefore: 'شما قبلا عضو این لیست نبوده اید!',
  enterGroupName: 'لطفا نام گروه را مشخص کنید.',
  commandAccessDenied: 'شما نمیتوانید این دستور رو اجرا کنید.',

  startupMessage: `Bot started \n\nv${__package_version__}`,
  itIsPrivateBot: 'این یک بات خصوصی هست! لطفا مزاحم نشوید',
} as const;
