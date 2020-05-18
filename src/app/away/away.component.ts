import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GetWishlist} from '../shared/actions/wishlist.action';
import {Select, Store} from '@ngxs/store';
import {WishlistState} from '../shared/states/wishlist.state';
import {Observable} from 'rxjs';
import {Wishlist} from '../shared/models/wishlist';
import {AuthService} from '../shared/auth/service/auth.service';

@Component({
  selector: 'app-away',
  templateUrl: './away.component.html',
  styleUrls: ['./away.component.scss']
})
export class AwayComponent implements OnInit {

  @Select(WishlistState.getWishlist) wishlist: Observable<Wishlist>;
  w: Wishlist;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private as: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    /*if (id) {
      this.router.navigateByUrl('login');
    } else*/
    if (id === this.as.getUserID()) {
      this.router.navigateByUrl('home');
    }
    this.store.dispatch(new GetWishlist(id));
    this.wishlist.subscribe( data => this.w = data);
  }

}
