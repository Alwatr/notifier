export type MsgItem =
  | {
    type: 'text';
    text: string;
  }
  | {
    type: 'forward';
    messageId: number;
    fromChatId: number;
  }
  | {
    type: 'photo';
    fileId: string;
    caption: string;
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

  enter_group: [
    {
      type: 'text',
      text: 'menu enter_group',
    },
  ] as MsgItem[],

  course_info: [
    {
      type: 'text',
      text: 'menu course_info',
    },
  ] as MsgItem[],

  invite_friends: [
    {
      type: 'text',
      text: 'task7 referral_templates description',
    },
    {
      type: 'text',
      text: 'task7 referral_templates 1 \n\n {invite_link}',
    },
    {
      type: 'text',
      text: 'task7 referral_templates 2 \n\n {invite_link}',
    },
    {
      type: 'text',
      text: 'task7 referral_templates 3 \n\n {invite_link}',
    },
  ] as MsgItem[],

  stats: [
    {
      type: 'text',
      text: 'menu stats',
    },
  ] as MsgItem[],

  schedule_meetings: [
    {
      type: 'text',
      text: 'menu schedule_meetings',
    },
  ] as MsgItem[],

  support: [
    {
      type: 'text',
      text: 'menu support',
    },
  ] as MsgItem[],

} as const;
