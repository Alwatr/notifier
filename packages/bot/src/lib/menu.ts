import {Keyboard} from 'grammy';

export const menuItems = {
  enter_group: 'ورود به سالن اصلی 🎻',
  course_info: 'اطلاعات کامل دوره ℹ️',

  invite_friends: 'دعوت از دوستان 🎁',
  stats: 'آمار دعوت‌های شما 📊',

  schedule_meetings: 'زمان‌بندی جلسات 🗓️',
  support: 'پشتیبانی 💬',
} as const;

export const mainMenu = new Keyboard()
  .text(menuItems.enter_group)
  .text(menuItems.course_info)
  .row() // line break
  .text(menuItems.invite_friends)
  .text(menuItems.stats)
  .row() // line break
  .text(menuItems.schedule_meetings)
  .text(menuItems.support)
  .resized()
  .persistent();
