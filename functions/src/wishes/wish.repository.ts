export interface WishRepository {

  createWishlist(uid: string): Promise<any>;

  deleteUserWishes(uid: string): Promise<any>;

  hasWishlistWithId(uid: string): Promise<boolean>;
}
