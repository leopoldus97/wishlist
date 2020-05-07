import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {User} from '../models/user';
import {FormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: Observable<User>;

  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.userData = afa.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  SignUp(user: User, password: string) {
    this.afa.auth.createUserWithEmailAndPassword(user.email, password).then(res => {
      console.log('You are successfully signed up!', res);
      this.router.navigate(['']);
      this.UpdateUserData(res.user);
    }).catch(err => {
      console.log('Something is wrong:', err.message);
    });
  }

  SignIn(email: string, password: string) {
    const u = this.afa.auth.signInWithEmailAndPassword(email, password).then(res => {
      console.log('You are succesfully logged in!');
      localStorage.setItem('id', res.user.uid);
      this.router.navigate(['home']);
      this.UpdateUserData(res.user);
    }).catch(err => {
      console.log('Something is wrong:', err.message);
      this.snackBar.open(err.message);
    });
  }

  SignOut() {
    this.afa.auth.signOut().then(res => {
      localStorage.removeItem('id');
      console.log('You are successfully signed out!', res);
      this.router.navigate(['']);
    }).catch(err => {
      console.log('Something is wrong:', err.message);
    });
  }

  UpdateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      nickName: user.nickName
    };

    return userRef.set(data, {merge: true}).catch(err => {
      console.log('Update user data failed: ', err);
    });
  }

  getUserID(): string {
    return localStorage.getItem('id');
  }
}
