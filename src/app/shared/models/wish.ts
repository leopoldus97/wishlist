import {User} from './user';

export interface Wish {
  uid?: string;
  name: string;
  description?: string;
  buyer?: User[];
  url?: string;
}
