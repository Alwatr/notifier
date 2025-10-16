import {Keyboard} from 'grammy';

export const menuItems = {
  enter_group: 'ورود به گروه دوره 🎵',
  course_info: 'اطلاعات کامل دوره ℹ️',

  schedule_meetings: 'زمان‌بندی جلسات 🗓️',
  support: 'پشتیبانی 💬',

  gift: 'هدیه ویژه 🎁',

  invite_templates: 'پیام‌های آماده دعوت ✨',
  stats: 'مشاهده آمار دعوتی‌ها 📊',
} as const;

export const mainMenu = new Keyboard()
  .text(menuItems.course_info)
  .text(menuItems.enter_group)
  .row() // line break
  .text(menuItems.support)
  .text(menuItems.schedule_meetings)
  .row() // line break
  .text(menuItems.gift)
  .row() // line break
  .text(menuItems.invite_templates)
  .text(menuItems.stats)
  .resized()
  .persistent();
