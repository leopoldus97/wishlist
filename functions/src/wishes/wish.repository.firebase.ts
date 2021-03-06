import {WishRepository} from './wish.repository';
import * as admin from 'firebase-admin';

export class WishRepositoryFirebase implements WishRepository{

  db(): FirebaseFirestore.Firestore {
    return admin.firestore();
  }

  createWishlist(uid: string): Promise<any> {
    return this.db().doc(`wishlist/${uid}`).set({
      uid: uid,
      wishes: []
    })
  }

  deleteUserWishes(uid: string): Promise<any> {
    return this.db().doc(`wishlist/${uid}`).delete();
  }

  async hasWishlistWithId(uid: string): Promise<boolean> {
    let docRef = this.db().collection('wishlist').doc(uid);

    let doc = await docRef.get();

    return Promise.resolve(doc.exists);
  }

}


