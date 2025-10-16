import {InlineKeyboard} from 'grammy';

import {mainMenu, menuItems} from './menu.js';

import type {Duration} from 'alwatr/nanolib';
import type {InlineKeyboardMarkup, ParseMode, ReplyKeyboardMarkup} from 'grammy/types';

export type MsgItem =
  | {
    type: 'text';
    text: string;
    parseMode?: ParseMode;
    keyboard?: InlineKeyboardMarkup | ReplyKeyboardMarkup;
  }
  | {
    type: 'forward';
    messageId: number;
    fromChatId: number;
    keyboard?: InlineKeyboardMarkup;
  }
  | {
    type: 'photo';
    fileId: string;
    caption: string;
    parseMode?: ParseMode;
    keyboard?: InlineKeyboardMarkup;
  }
  | {
    type: 'delay';
    duration: Duration;
  };

export const messages = {
  private_chat_only: [
    {
      type: 'text',
      text: '⚠️ این دستور فقط در چت خصوصی با ربات قابل استفاده است!',
    },
  ] as MsgItem[],

  already_registered: [
    {
      type: 'text',
      // task3
      text: `
ما قبلا افتخار آشنایی با شما رو داشتیم 😉

لطفا از منوهای زیر کمک بگیر!
`,
      parseMode: 'HTML',
      keyboard: mainMenu,
    },
  ] as MsgItem[],

  request_contact: [
    {
      type: 'text',
      text: `
سلام
خوش اومدی! 😍


فقط یک قدم تا ورود به گروه دوره <b>سمفونی دونفره</b> با تدريس محمدصادق نجات و شرکت <b>رايگان</b> در جلسه صفر باقی مانده.


لطفاً با دکمه‌ی زیر، شماره تماست را به اشتراک بگذار تا لینک ورود برایت ارسال شود.
`,
      parseMode: 'HTML',
    },
  ] as MsgItem[],

  request_contact_keyboard_text: 'ارسال شماره تماس 📞',
  invalid_contact_text: '⚠️ لطفا از دکمه زیر برای ارسال شماره تماس خود استفاده کنید!',

  register_success: [
    {
      type: 'text',
      text: `
اولین گام شما برای ورود به «سمفونی دونفره» با موفقیت ثبت شد.
به این تجربه خوش آمدی! 🎶


لطفا از كليد زير برای ورود استفاده کن.
منتظرت هستیم 🤗
`,
      keyboard: new InlineKeyboard().url('ورود به دوره ⚡️', 'https://t.me/+rBADEEhHYV4wM2I0'),
    },
    {
      type: 'delay',
      duration: '30s',
    },
    {
      type: 'text',
      text: `
ما در کنارت هستیم ☺️

اگر سوالی داشتی، پشتیبانی پاسخگوست.
`,
      keyboard: mainMenu,
    },
  ] as MsgItem[],

  enter_group: [
    {
      type: 'text',
      text: '**menu** enter group',
    },
  ] as MsgItem[],

  course_info: [
    {
      type: 'text',
      text: '**menu** course info',
    },
  ] as MsgItem[],

  gift: [
    {
      type: 'text',
      text: `
و اما هدیه قدردانی ما از همراهی شما... 🎁


ما برای شما، یک لینک دعوت اختصاصی درست کردیم: 🤭

<code>{invite_link}</code>

به وسیله این لینک می‌تونی دوستان و آشنایانت رو به دوره <b>سمفونی دونفره</b> دعوت کنی و… 🤗

<b>به ازای هر ثبت‌نام موفق که از طریق لینک شما انجام بشه، مبلغ ۱۰۰ هزار تومان هدیه نقدی دریافت خواهی کرد!</b>


محدودیتی وجود نداره!
هرچه دوستان بیشتری دعوت کنی، هدیه‌ات هم بزرگ‌تر میشه. 🚀

روی کلید زیر بزن و از پیام‌های آماده دعوت استفاده کن.
`,
      parseMode: 'HTML',
      keyboard: new InlineKeyboard().text('پیام‌های آماده دعوت ✨', 'invite_templates'),
    },
  ] as MsgItem[],

  invite_templates: [
    {
      type: 'text',
      text: `
سلام عزیز

یاد تو افتادم چون می‌دونم چقدر نگاه عمیق به روابط برات مهمه.

می‌خوام به یک تجربه خیلی خاص دعوتت کنم: کارگاه «سمفونی دونفره». این کارگاه یاد می‌ده چطور مثل یک «مشاهده‌گر» ماهر، واقعیتِ رابطه رو ببینی، نه فقط اون چیزی که در ذهن ما می‌گذره.

مدرسش «محمدصادق نجات» هست که با نگاه کوچینگ، ریزه‌کاری‌های روابط رو فوق‌العاده تحلیل می‌کنه.

من یک دعوت‌نامه رایگان برای جلسه اول برات گرفتم که به عنوان هدیه از طرف من شرکت کنی. 🎁

از این لینک می‌تونی دعوتم رو قبول کنی:

{invite_link}
`,
    },
    {
      type: 'delay',
      duration: '1s',
    },
    {
      type: 'photo',
      fileId: 'AgACAgQAAxkBAAODaPCcq3-_sXUwCBw4uLR1MQEkF9cAAn3LMRtm1YhT4vbKdA5Jf0QBAAMCAAN5AAM2BA',
      caption: 'این دوره رو از دست نده! 😍',
    },
  ] as MsgItem[],

  stats: [
    {
      type: 'text',
      text: `
تعداد ثبت‌نام اولیه با لینک اختصاصی شما {referral_count} نفر است!


ما در تیم ویسان {referral_earn} تومان برای شما کنار گذاشته‌ایم؛
در صورت تکمیل ثبت‌نام افراد بالا، این مبلغ برای شما محاسبه می‌شود! 💰
`,
    },
  ] as MsgItem[],

  schedule_meetings: [
    {
      type: 'text',
      text: '**menu** schedule meetings',
    },
  ] as MsgItem[],

  support: [
    {
      type: 'text',
      text: '**menu** support',
    },
  ] as MsgItem[],

  new_refer_user: [
    {
      // task8
      type: 'text',
      text: `
خبر خوب! 🎉

ایشون، {name} دعوت شما را پذیرفت و اولین قدم را در سفر «سمفونی دونفره» برداشت.


از دکمه زیر برای مشاهده آمار دعوتی‌هات استفاده کن 😎
`,
      keyboard: new InlineKeyboard().text(menuItems.stats, 'stats'),
    },
  ] as MsgItem[],
} as const;
