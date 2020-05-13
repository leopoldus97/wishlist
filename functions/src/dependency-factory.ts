import {WishController} from './wishes/wish.controller';
import {WishRepository} from './wishes/wish.repository';
import {WishRepositoryFirebase} from './wishes/wish.repository.firebase';
import {WishService} from './wishes/wish.service';
import {WishControllerFirebase} from './wishes/wish.controller.firebase';

export class DependencyFactory {

  getWishController(): WishController {
    const repo: WishRepository = new WishRepositoryFirebase();
    const serv: WishService = new WishService(repo);
    return new WishControllerFirebase(serv);
  }

}
