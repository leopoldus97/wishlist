import {Wishlist} from '../models/wishlist';

export class GetWishlist {
  static readonly type = '[Wishlist] Get';
  constructor(public userID: string) { }
}

export class CreateWishlist {
  static readonly type = '[Wishlist] Create';
  constructor(public userID: string, public wl: Wishlist) { }
}

export class UpdateWishlist {
  static readonly type = '[Wishlist] Update';
  constructor(public userID: string, public wl: Wishlist) { }
}

export class DeleteWishlist {
  static readonly type = '[Wishlist] Delete';
  constructor(public userID: string) { }
}
