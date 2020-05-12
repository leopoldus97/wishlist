import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Wishlist} from '../models/wishlist';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  path = 'wishlist/';

  constructor(private afs: AngularFirestore) { }

  readWishlist(userID: string): Observable<Wishlist> {
    return this.afs.doc<Wishlist>(this.path + userID).valueChanges();
  }

  createWishList(userID: string, wishlist: Wishlist): Promise<any> {
    return this.afs.doc<Wishlist>(this.path + userID).set(wishlist);
  }

  updateWishlist(userID: string, wishlist: Wishlist): Promise<any> {
    return this.afs.doc<Wishlist>(this.path + userID).update(wishlist);
  }

  deleteWishlist(userID: string): Promise<any> {
    return this.afs.doc<Wishlist>(this.path + userID).delete();
  }
}
