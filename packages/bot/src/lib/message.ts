import { register } from "module";

export type MsgItem =
  | {
    type: 'text';
    text: string;
  }
  | {
    type: 'simple';
    messageId: number;
    fromChatId: number;
  };

export const messages = {
  private_chat_only: [
    {
      type: 'text',
      text: '⚠️ این دستور فقط در چت خصوصی با ربات قابل استفاده است\\!',
    },
  ] as MsgItem[],

  already_registered: [
    {
      type: 'text',
      text: 'task11 already_registered',
    },
  ] as MsgItem[],

  request_contact: [
    {
      type: 'text',
      text: 'task2 request_contact',
    },
  ] as MsgItem[],

  register_success: [
    {
      type: 'text',
      text: 'task3 register_success',
    },
  ] as MsgItem[],

  request_contact_keyboard_text: 'ارسال شماره تماس 📞',
  invalid_contact_text: '⚠️ لطفا از دکمه زیر برای ارسال شماره تماس خود استفاده کنید\\!',
} as const;

export const message = {
  new_refer_user: `
کاربر جدیدی به نام {user} با لینک شما وارد ربات شد.
تعداد دعوت‌های شما به {count} نفر رسید. 🎉
  `,

  registerSuccess: `
سلام {firstName} عزیز
ثبت‌نام شما با موفقیت انجام شد! 🎉
به دوره خوش آمدید. برای ورود به دوره، لطفاً از لینک زیر استفاده کنید:

https://t.me/ali_mihandoost_ml

هر سوال یا مشکلی داشتید، لطفاً با پشتیبانی @wesun_pr در میان بگذارید.
`,

  alreadyRegistered: `
سلام {firstName} عزیز
شما قبلاً در ربات ثبت‌نام کرده‌اید! 😊
برای استفاده از دوره، لطفاً از لینک زیر استفاده کنید:

https://t.me/ali_mihandoost_ml

هر سوال یا مشکلی داشتید، لطفاً با پشتیبانی @wesun_pr در میان بگذارید.
`,

  referralMessage: `
درضمن لینک دعوت اختصاصی شما
  
{link}
`,
} as const;
