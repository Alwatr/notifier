import {InlineKeyboard, Keyboard} from 'grammy';

import {mainMenu} from './menu.js';

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

export const userDeclineContactMessage = 'مایل به ارسال شماره تماس نیستم 🚫';
const requestContactKeyboard = new Keyboard()
  .requestContact('ارسال شماره تماس 📞')
  .row() // line break
  .text(userDeclineContactMessage)
  .resized()
  .persistent();

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

اگر مایل به ارسال شماره تماس نیستی، می‌تونی با زدن دکمه «مایل به ارسال شماره تماس نیستم 🚫» ادامه بدی.
`,
      parseMode: 'HTML',
      keyboard: requestContactKeyboard,
    },
  ] as MsgItem[],

  invalid_contact: [
    {
      type: 'text',
      text: '⚠️ لطفا فقط از دکمه زیر برای ارسال شماره تماس خود استفاده کنید!',
      keyboard: requestContactKeyboard,
    },
  ] as MsgItem[],

  register_success: [
    {
      type: 'text',
      text: `
اولین گام شما برای ورود به «سمفونی دونفره» با موفقیت ثبت شد.
به این تجربه خوش آمدی! 🎶
`,
      keyboard: mainMenu,
    },
    {
      type: 'text',
      text: `
لطفا از کلید زير برای ورود استفاده کن.
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
      text: `لطفا از کلید زير برای ورود به گروه «سمفونی دونفره» استفاده کن.`,
      keyboard: new InlineKeyboard().url('ورود به دوره ⚡️', 'https://t.me/+rBADEEhHYV4wM2I0'),
    },
  ] as MsgItem[],

  course_info: [
    {
      type: 'text',
      text: `
برای دریافت اطلاعات بیشتر در مورد جزییات دوره <b>سمفونی دونفره</b> نظیر:

- سرفصل‌های دوره،
- اعتبارات و سوابق استاد دوره،
- نظر مخاطبین قبلی دوره
- و دستاوردهای شما در پایان دوره

به صفحه سمفونی دونفره در سایت رسمی مدرسه ویسان سر بزنید 🤗
`,
      parseMode: 'HTML',
      keyboard: new InlineKeyboard()
        .url('صفحه سمفونی دونفره', 'https://wesun.school/coaching/symphony/')
        .row()
        .url('وبسایت مدرسه ویسان', 'https://wesun.school/'),
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

روی کلید 'پیام‌های آماده دعوت' بزن و ازش استفاده کن.
`,
      parseMode: 'HTML',
      keyboard: mainMenu,
    },
  ] as MsgItem[],

  invite_templates: [
    {
      type: 'photo',
      fileId: 'AgACAgQAAxkBAAODaPCcq3-_sXUwCBw4uLR1MQEkF9cAAn3LMRtm1YhT4vbKdA5Jf0QBAAMCAAN5AAM2BA',
      caption: `
سلام 🌱

دارم ازت برای شرکت رایگان در اولین جلسه دوره سمفونی دونفره دعوت میکنم 🎵


یه دوره‌ با تدریس محمدصادق نجات برای همه‌ی کسانی که می‌خوان یاد بگیرن
چطور در رابطه‌ها، با حضور، احترام و آگاهی گفت‌وگو کنن.


اگر گفت‌وگوهای زندگی‌ت گاهی به دلخوری یا سکوت می‌رسن… دوره سمفونی یه نقطه‌ی تازه‌ست برای بازگشت به گفت‌وگو 🌿


کافیه روی لینک زیر بزنی و از تمام مزایای این دوره باخبر بشی.

{invite_link}
`,
    },
  ] as MsgItem[],

  stats: [
    {
      type: 'text',
      text: `
تعداد ثبت‌نام اولیه با لینک اختصاصی شما {referral_count} نفر است!


ما در تیم ویسان <b>{referral_earn} تومان</b> برای شما کنار گذاشته‌ایم؛
در صورت تکمیل ثبت‌نام افراد بالا، این مبلغ برای شما محاسبه می‌شود! 💰
`,
      parseMode: 'HTML',
      keyboard: mainMenu,
    },
  ] as MsgItem[],

  schedule_meetings: [
    {
      type: 'text',
      text: `
جزییات برگزاری این دوره رو به طور کامل ولی خلاصه این‌جاست 👇🏻


<b>0️⃣ جلسه صفر</b>
یک‌شنبه، ۲۷ مهرماه، ساعت ۱۹ الی ۲۱

(شرکت در این جلسه <b>رایگان</b> است!)

<b>0️⃣ جلسه اول</b>
یک‌شنبه، ۴ آبان‌ماه، ساعت ۱۹ الی ۲۱

(این جلسه <b>هدیه</b> ما به شماست. شرکت در این جلسه نیاز به پرداخت ندارد!🎁)

<b>2️⃣ جلسه دوم</b>
یک‌شنبه، ۱۱ آبان‌ماه، ساعت ۱۹ الی ۲۱

<b>3️⃣ جلسه سوم</b>
یک‌شنبه، ۱۸ آبان‌ماه، ساعت ۱۹ الی ۲۱

<b>4️⃣ جلسه چهارم</b>
یک‌شنبه، ۲۵ آبان‌ماه، ساعت ۱۹ الی ۲۱
`,
      parseMode: 'HTML',
      keyboard: mainMenu,
    },

    {
      type: 'text',
      text: `
مبلغ سرمایه‌گذاری شما برای دوره ۷۸۰ هزار تومان است که مختصری تخفیف برای اهالی ویسان در نظر گرفته‌ایم ☺️


جهت تکمیل ثبت‌نام در این دوره و پرداخت نهایی از طریق کلید زیر اقدام کنین
`,
      keyboard: new InlineKeyboard().url('تکمیل ثبت‌نام در سمفونی دونفره 🎵', 'https://wesun.school/coaching/symphony/#main-cta'),
    },
  ] as MsgItem[],

  support: [
    {
      type: 'text',
      text: `برای دریافت پشتیبانی و پاسخ به سوالاتت، می‌تونی از طریق راه‌های زیر با ما در ارتباط باشی:`,
      parseMode: 'HTML',
      keyboard: new InlineKeyboard()
        .url('چت با واحد فروش 💬', 'https://t.me/wesun_sales')
        .row()
        .url('وبسایت مدرسه ویسان', 'https://wesun.school/')
        .row()
        .url('اینستاگرام مدرسه ویسان', 'https://www.instagram.com/wesun.school/')
        .row()
        .url('اینستاگرام محمدصادق نجات', 'https://www.instagram.com/msadeghnejat/'),
    },
  ] as MsgItem[],

  new_referral_user: [
    {
      // task8
      type: 'text',
      text: `
خبر خوب! 🎉

ایشون، {name} دعوت شما را پذیرفت و اولین قدم را در سفر «سمفونی دونفره» برداشت.


از دکمه 'مشاهده آمار دعوتی‌ها' برای دیدن آمار استفاده کن 😎
`,
      keyboard: mainMenu,
    },
  ] as MsgItem[],

  new_referral_paid: [
    {
      // task8
      type: 'text',
      text: `
خبر عالی! 🎉🎉

ایشون، {name} پرداختش را نهایی کرد! 💵

این یعنی هدیه شما هم قطعی شد! 🤑

از دکمه 'مشاهده آمار دعوتی‌ها' برای دیدن آمار و پیگیری‌شون استفاده کن 😎
`,
      keyboard: mainMenu,
    },
  ] as MsgItem[],

  noAdminRight: 'ببخشید شما؟! 🤨',
  fun: [
    'اععع... سلام نن جونم 😍',
    'وای قربونت بشن ننه 😍😍',
    'نن جون دلم برات تنگ شده بود 😍',
    'نن جون عشقم کجاییییییییییییییییییییییییییییییی؟ 😍',
    'نن جونم چقدر دلم برات تنگ شده بود 😍',
  ] as string[],
} as const;
