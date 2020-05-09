import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth/service/auth.service';
import {WishlistState} from '../shared/states/wishlist.state';
import {Observable} from 'rxjs';
import {Wishlist} from '../shared/models/wishlist';
import {Select, Store} from '@ngxs/store';
import {GetWishlist} from '../shared/actions/wishlist.action';
import {User} from '../shared/models/user';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  @Select(WishlistState.getWishlist) wishlist: Observable<Wishlist>;
  user: User;
  w: Wishlist;

  constructor(
    public authServ: AuthService,
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authServ.getUserID() === null) {
      this.router.navigate(['/login']);
    }
    this.store.dispatch(new GetWishlist(this.authServ.getUserID()));
    this.authServ.userData.subscribe(data => this.user = data);
    this.wishlist.subscribe(data => this.w = data);
  }
  test() {
    console.log('Test worked');
  }

  ngAfterViewInit() {
    document.querySelector('body').classList.add('login');
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('login');
  }
}
