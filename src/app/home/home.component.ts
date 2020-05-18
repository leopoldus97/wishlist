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
import {CreateComponent} from '../create/create.component';
import {UserState} from '../shared/states/user.state';
import {GetUser, TestUser} from '../shared/actions/user.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Select(WishlistState.getWishlist) wishlist: Observable<Wishlist>;
  @Select(UserState.getUser) userState: Observable<User>;
  user: User;
  w: Wishlist;

  constructor(
    public authServ: AuthService,
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
    this.wishlist.subscribe(data => this.w = data);
  }
  addWish() {
    console.log('Test worked');
    const dialogRef = this.dialog.open(CreateComponent, {
      height: '400px',
      width: '600px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe( wish => {
      if (wish == null) { return; }
      this.w.wishes.push(wish);
      this.store.dispatch(new UpdateWishlist(this.user.uid, this.w));
    });
  }
}
