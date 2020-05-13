export interface WishRepository {

  createWishlist(uid: string): Promise<any>;

}
