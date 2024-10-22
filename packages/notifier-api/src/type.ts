import type {Chat} from 'grammy/types';

declare global {
  type GroupItem = {
    categoryName: string;
    memberList: MemberItem[];
  }

  type MemberItem = {
    id: string;
    type: Chat['type'],
    username?: Chat['username'];
    first_name?: Chat['first_name'];
    last_name?: Chat['last_name'];
  }
}
