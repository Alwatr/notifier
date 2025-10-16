import {Keyboard} from 'grammy';

export const menuItems = {
  enter_group: 'ورود به گروه دوره 🎵',
  course_info: 'اطلاعات کامل دوره ℹ️',

  gift: 'هدیه ویژه 🎁',
  stats: 'مشاهده آمار دعوتی‌ها 📊',

  schedule_meetings: 'زمان‌بندی جلسات 🗓️',
  support: 'پشتیبانی 💬',
} as const;

export const mainMenu = new Keyboard()
  .text(menuItems.course_info)
  .text(menuItems.enter_group)
  .row() // line break
  .text(menuItems.stats)
  .text(menuItems.gift)
  .row() // line break
  .text(menuItems.support)
  .text(menuItems.schedule_meetings)
  .resized()
  .persistent();
