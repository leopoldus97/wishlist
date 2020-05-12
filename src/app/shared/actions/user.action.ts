import {User} from '../models/user';

export class GetUser {
  static readonly type = '[User] Get';
  constructor(public userID: string) { }
}

export class UpdateUser {
  static readonly type = '[User] Update';
  constructor(public user: User) { }
}

export class CreateUser {
  static readonly type = '[User] Create';
  constructor(public user: User) { }
}
