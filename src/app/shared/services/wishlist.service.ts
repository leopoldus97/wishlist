import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Wishlist} from '../models/wishlist';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  path = 'wishlists/';

  constructor(private afs: AngularFirestore) { }

  readWishlist(userID: string): Observable<Wishlist> {
    return this.afs.doc<Wishlist>(this.path + userID).valueChanges();
  }
}
