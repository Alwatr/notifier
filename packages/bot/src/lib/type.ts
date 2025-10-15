import type {} from '@alwatr/nano-build';
import type {} from '@alwatr/type-helper';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  username: string | null;
  phone: string | null;
  invitedBy: number | null;
  referralCount: number;
};
