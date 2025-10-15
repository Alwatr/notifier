import {Keyboard} from 'grammy';

export const menuItems = {
  enterGroup: 'ورود به سالن اصلی 🎻',
  courseInfo: 'اطلاعات کامل دوره ℹ️',

  inviteFriends: 'دعوت از دوستان 🎁',
  stats: 'آمار دعوت‌های شما 📊',

  scheduleMeetings: 'زمان‌بندی جلسات 🗓️',
  support: 'پشتیبانی 💬',
} as const;

export const mainMenu = new Keyboard()
  .text(menuItems.enterGroup)
  .text(menuItems.courseInfo)
  .row() // line break
  .text(menuItems.inviteFriends)
  .text(menuItems.stats)
  .row() // line break
  .text(menuItems.scheduleMeetings)
  .text(menuItems.support)
  .resized()
  .persistent();
