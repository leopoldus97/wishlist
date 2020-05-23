import {WishController} from './wishes/wish.controller';
import {WishRepository} from './wishes/wish.repository';
import {WishRepositoryFirebase} from './wishes/wish.repository.firebase';
import {WishService} from './wishes/wish.service';
import {WishControllerFirebase} from './wishes/wish.controller.firebase';
import {UserController} from './users/user.controller';
import {UserRepository} from './users/user.repository';
import {UserRepositoryFirebase} from './users/user.repository.firebase';
import {UserService} from './users/user.service';
import {UserControllerFirebase} from './users/user.controller.firebase';

export class DependencyFactory {

  getWishController(): WishController {
    const repo: WishRepository = new WishRepositoryFirebase();
    const serv: WishService = new WishService(repo);
    return new WishControllerFirebase(serv);
  }

  getUserController(): UserController {
    const repo: UserRepository = new UserRepositoryFirebase();
    const serv: UserService = new UserService(repo);
    return new UserControllerFirebase(serv);
  }

}
