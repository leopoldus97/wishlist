import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {WishlistState} from '../shared/states/wishlist.state';
import {Observable} from 'rxjs';
import {Wishlist} from '../shared/models/wishlist';
import {Select, Store} from '@ngxs/store';
import {GetWishlist} from '../shared/actions/wishlist.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Select(WishlistState.getWishlist) wishlist: Observable<Wishlist>;
  profileImage: File = null;

  constructor(
    public authServ: AuthService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new GetWishlist(this.authServ.userID));
  }

  selectProfileImage(event) {
    if (event.target.files[0].type.includes('image')) {
      this.profileImage = event.target.files[0];
      console.log('found an image');
    }
    else {
      console.log('need an image');
    }
  }

  logout() {
    this.authServ.SignOut();
  }
}
