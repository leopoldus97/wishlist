import {WishRepository} from './wish.repository';

export class WishService {

  constructor(private repo: WishRepository) {}

  createWishlist(uid: string): Promise<any> {
    return this.repo.createWishlist(uid);
  }

}
