import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GetWishlist, UpdateWishlist} from '../shared/actions/wishlist.action';
import {Select, Store} from '@ngxs/store';
import {WishlistState} from '../shared/states/wishlist.state';
import {Observable} from 'rxjs';
import {Wishlist} from '../shared/models/wishlist';
import {AuthService} from '../shared/auth/service/auth.service';
import {User} from '../shared/models/user';
import {UserState} from '../shared/states/user.state';
import {GetUser} from '../shared/actions/user.action';
import {Wish} from '../shared/models/wish';
import {CreateWishComponent} from '../home/create-wish/create-wish.component';
import {MatDialog} from '@angular/material/dialog';
import {BuyCancelComponent} from './buy-cancel/buy-cancel.component';

@Component({
  selector: 'app-away',
  templateUrl: './away.component.html',
  styleUrls: ['./away.component.scss']
})
export class AwayComponent implements OnInit {

  @Select(WishlistState.getWishlist) wishlist: Observable<Wishlist>;
  @Select(UserState.getUser) loggedUser: Observable<User>;
  w: Wishlist;
  user: User;
  watchedMember: string;
  watchedMemberID: string;
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private as: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) { }

    ngOnInit(): void {
    console.log('away');
    this.watchedMemberID = this.route.snapshot.paramMap.get('id');
    this.watchedMember = localStorage.getItem('watchedMember');
    /*if (id) {
      this.router.navigateByUrl('login');
    } else*/
    this.store.dispatch(new GetWishlist(this.watchedMemberID));
    this.wishlist.subscribe( data => this.w = data);
    this.loggedUser.subscribe(data => this.user = data);
  }

  buy(wish: Wish) {
    if (wish.buyer === undefined || wish.buyer.find(buyer  => buyer.email === this.user.email) === undefined ) {
    const dialogRef = this.dialog.open(BuyCancelComponent, {
      data: { buyMode: true },
      height: 'auto',
      width: 'auto',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe( result => {
      if (result == null) { return; }

      if (wish.buyer === undefined){
        const buyerList: User[] = [];
        buyerList.push(this.user);
        wish.buyer = buyerList;
      } else {
        wish.buyer.push(this.user);
      }

      const wishIndex = this.w.wishes.findIndex(data =>
        data.name === wish.name &&
        data.description === wish.description &&
        data.url === wish.url);

      this.w.wishes[wishIndex] = wish;
      this.store.dispatch(new UpdateWishlist(this.watchedMemberID, this.w));

    }); } else {
      this.cancel(wish);
    }
  }

  cancel(wish: Wish) {
     const dialogRef = this.dialog.open(BuyCancelComponent, {
       data: { buyMode: false },
       height: 'auto',
       width: 'auto',
       disableClose: true
     });
     dialogRef.afterClosed().subscribe( result => {
       if (result == null) { return; }

       const buyerIndex = wish.buyer.findIndex(buyer =>
         buyer.uid === this.user.uid);

       wish.buyer.splice(buyerIndex);

       this.store.dispatch(new UpdateWishlist(this.watchedMemberID, this.w));

     });
  }
}
