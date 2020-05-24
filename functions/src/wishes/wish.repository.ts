export interface WishRepository {

  createWishlist(uid: string): Promise<any>;

  deleteUserWishes(uid: string): Promise<any>;

  wishWithIdExists(uid: string): Promise<boolean>;
}
