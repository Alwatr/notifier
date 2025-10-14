import type {} from '@alwatr/nano-build';
import type {} from '@alwatr/type-helper';

export type User = {
  id: number;
  type: 'private' | 'group' | 'supergroup' | 'channel';
  title?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
};
