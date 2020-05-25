import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth/service/auth.service';
import {WishlistState} from '../shared/states/wishlist.state';
import {Observable} from 'rxjs';
import {Wishlist} from '../shared/models/wishlist';
import {Select, Store} from '@ngxs/store';
import {CreateWishlist, GetWishlist, UpdateWishlist} from '../shared/actions/wishlist.action';
import {User} from '../shared/models/user';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CreateComponent} from './create/create.component';
import {UserState} from '../shared/states/user.state';
import {GetUser, TestUser} from '../shared/actions/user.action';
import {Wish} from '../shared/models/wish';
import {EditComponent} from './edit/edit.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Select(WishlistState.getWishlist) wishlistState: Observable<Wishlist>;
  @Select(UserState.getUser) userState: Observable<User>;
  user: User;
  wishlist: Wishlist;

  constructor(
    private snackBar: MatSnackBar,
    private store: Store,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const id = localStorage.getItem('id');
    if (id === null) {
      this.router.navigate(['/login']);
    }
    this.store.dispatch(new GetWishlist(id));
    this.store.dispatch(new GetUser(id));
    this.userState.subscribe(data => this.user = data);
    this.wishlistState.subscribe(data => this.wishlist = data);
  }
  addWish() {
    console.log('Test worked');
    const dialogRef = this.dialog.open(CreateComponent, {
      height: '400px',
      width: '400px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe( wish => {
      if (wish == null) { return; }
      this.wishlist.wishes.push(wish);
      this.store.dispatch(new UpdateWishlist(this.user.uid, this.wishlist));
    });
  }

  editWish(wishToUpdate: Wish) {
    console.log('edit works');
    const dialogRef = this.dialog.open(EditComponent, {
      data: { wish: wishToUpdate },
      height: '400px',
      width: '400px',
      disableClose: true
    });
    const wishIndex = this.wishlist.wishes.findIndex(wish =>
      wish.name === wishToUpdate.name &&
      wish.description === wishToUpdate.description &&
      wish.url === wishToUpdate.url);

    dialogRef.afterClosed().subscribe( wish => {
      if (wish === true) { return; }
      else if (wish === false) {
        this.removeWish(wishIndex);
        return;
      }
      this.wishlist.wishes[wishIndex] = wish;
      this.store.dispatch(new UpdateWishlist(this.user.uid, this.wishlist));
    });
  }

  removeWish(wishToRemoveIndex: number) {
    this.wishlist.wishes.splice(wishToRemoveIndex);
    this.store.dispatch(new UpdateWishlist(this.user.uid, this.wishlist));
    this.snackBar.open('Your wish was removed.');
  }
}
