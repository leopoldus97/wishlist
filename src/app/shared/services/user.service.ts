import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  path = 'users/';

  constructor(
    private afs: AngularFirestore
  ) { }

  getUser(userID: string): Observable<User> {
    return this.afs.doc<User>(this.path + userID).valueChanges();
  }
}
