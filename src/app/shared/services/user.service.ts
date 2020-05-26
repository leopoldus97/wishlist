import { Injectable } from '@angular/core';
import {FileService} from './file.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userPath = 'users';

  constructor(private fs: FileService, private db: AngularFirestore) { }

  readUser(userID: string): Observable<User> {
    return this.db.doc<User>(this.userPath + '/' + userID).valueChanges()
      .pipe(map(user => {
        const u: User = {
          uid: user.uid,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          nickname: user.nickname,
          pictureURL: user.pictureURL,
          admin: user.admin
        };
        return u;
      }));
  }

  readUserWithPic(userID: string): Observable<User> {
    return this.readUser(userID)
      .pipe(switchMap(user => {
          return this.fs.getDownloadURL(user.pictureURL)
            .pipe(map(url => {
              user.pictureURL = url;
              return user;
            }));
      }));
  }

  createUser(user: User): Promise<any> {
    return this.db.collection<User>(this.userPath).add(user);
  }

  updateUser(user: User): Promise<any> {
    return this.db.doc<User>(this.userPath + '/' + user.uid).update(user);
  }
}
