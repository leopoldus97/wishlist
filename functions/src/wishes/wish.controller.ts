import {EventContext} from 'firebase-functions';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';

export interface WishController {
  createWishlist(snap: DocumentSnapshot, context: EventContext): Promise<void>;
  deleteUserWishes(snap: DocumentSnapshot, context: EventContext): Promise<any>;
}
