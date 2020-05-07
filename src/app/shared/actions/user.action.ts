export class GetUser {
  static readonly type = '[Wishlist] Get';
  constructor(public userID: string) { }
}

export class CreateUser {
  static readonly type = '[Wishlist] Create';
  constructor(public userID: string) { }
}

export class UpdateUser {
  static readonly type = '[Wishlist] Update';
  constructor(public userID: string) { }
}

export class DeleteUser {
  static readonly type = '[Wishlist] Delete';
  constructor(public userID: string) { }
}
