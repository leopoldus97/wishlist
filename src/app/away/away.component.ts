import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GetWishlist} from '../shared/actions/wishlist.action';
import {Select, Store} from '@ngxs/store';
import {WishlistState} from '../shared/states/wishlist.state';
import {Observable} from 'rxjs';
import {Wishlist} from '../shared/models/wishlist';

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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new GetWishlist(id));
    this.wishlist.subscribe( data => this.w = data);
  }

}
