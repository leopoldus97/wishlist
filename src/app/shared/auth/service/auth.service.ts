import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {User} from '../../models/user';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ClearUser, GetUser} from '../../actions/user.action';
import {Store} from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: Observable<User>;

  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store
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

  SignUp(user: User, password: string): Promise<any> {
    return this.afa.auth.createUserWithEmailAndPassword(user.email, password).then(res => {
      console.log('You are successfully signed up!', res);
      user.uid = res.user.uid;
      // this.store.dispatch(new GetUser(user.uid));
      // this.UpdateUserData(user);
    }).catch(err => {
      console.log('Something is wrong:', err.message);
    });
  }

  SignIn(email: string, password: string) {
    const u = this.afa.auth.signInWithEmailAndPassword(email, password).then(res => {
      console.log('You are succesfully logged in!');
      localStorage.setItem('id', res.user.uid);
      this.store.dispatch(new GetUser(res.user.uid));
      this.router.navigate(['home']);
      // this.UpdateUserData(res.user);
    }).catch(err => {
      console.log('Something is wrong:', err.message);
      this.snackBar.open(err.message);
    });
    return u;
  }

  SignOut() {
    this.afa.auth.signOut().then(res => {
      localStorage.clear();
      this.store.dispatch(new ClearUser());
      this.snackBar.open('You are successfully signed out!');
      this.router.navigate(['']);
    }).catch(err => {
      console.log('Something is wrong:', err.message);
      this.snackBar.open(err.message);
    });
  }

  UpdateUserData(user): Promise<any> {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      nickname: user.nickname
    };

    return userRef.set(data, {merge: true}).catch(err => {
      console.log('Update user data failed: ', err);
      this.snackBar.open(err.message);
    });
  }
  resetPassword(email: string) {
    this.afa.auth.sendPasswordResetEmail(email).then(() =>
      this.snackBar.open('Link was sent to your email')
    );
  }
  getUserID(): string {
    return localStorage.getItem('id');
  }
}
