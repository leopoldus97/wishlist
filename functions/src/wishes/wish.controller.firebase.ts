import {WishController} from './wish.controller';
import {WishService} from './wish.service';
import {EventContext} from 'firebase-functions';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';

export class WishControllerFirebase implements WishController {

  constructor(private serv: WishService) {}

  createWishlist(snap: DocumentSnapshot, context: EventContext): Promise<void> {
    return this.serv.createWishlist(context.params.uid);
  }

  deleteUserWishes(snap: DocumentSnapshot, context: EventContext): Promise<any> {
    return this.serv.deleteUserWishes(context.params.uid);
  }

}
