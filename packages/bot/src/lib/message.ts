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

  invite_friends: [
    {
      type: 'text',
      text: '**task7** referral templates description',
    },
    {
      type: 'text',
      text: '**task7** referral templates 1 \n\n {invite_link}',
    },
    {
      type: 'text',
      text: '**task7** referral templates 2 \n\n {invite_link}',
    },
    {
      type: 'text',
      text: '**task7** referral templates 3 \n\n {invite_link}',
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

ایشون، [نام دوست شما] دعوت شما را پذیرفت و اولین قدم را در سفر «سمفونی دونفره» برداشت.


از دکمه زیر برای مشاهده آمار دعوتی‌هات استفاده کن 😎
`,
      keyboard: new InlineKeyboard().text(menuItems.stats, 'stats'),
    },
  ] as MsgItem[],
} as const;
