import {WishRepository} from './wish.repository';

export class WishService {

  constructor(private repo: WishRepository) {}

  async createWishlist(uid: string): Promise<any> {
    if(uid === undefined)
      return Promise.reject('User uid can NOT be undefined when creating wishlist');

    if(uid === null)
      return Promise.reject('User uid can NOT be null when creating wishlist');

    let exist = await this.repo.hasWishlistWithId(uid);

    if(exist === true)
      return Promise.reject('This user already has a wishlist created');

    return this.repo.createWishlist(uid);
  }

  deleteUserWishes(uid: string): Promise<any> {

    if(uid === undefined)
      return Promise.reject('User uid can NOT be undefined on delete wishlist request');

    if(uid === null)
      return Promise.reject('User uid can NOT be null on delete wishlist request');

    return this.repo.deleteUserWishes(uid);
  }
}


