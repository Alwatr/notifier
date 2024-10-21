import type {Chat} from 'grammy/types';

declare global {
  type GroupItem = {
    categoryName: string;
    memberList: Member[];
  }

  type Member = {
    id: string;
    type: Chat['type'],
    username?: string;
    first_name?: string;
    last_name?: string;
  }
}
