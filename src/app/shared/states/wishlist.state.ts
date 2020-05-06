import {Injectable} from '@angular/core';
import {WishlistService} from '../services/wishlist.service';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {GetWishlist} from '../actions/wishlist.action';
import {tap} from 'rxjs/operators';
import {Wishlist} from '../models/wishlist';

export class WishlistStateModel {
  wishlist: Wishlist;
}

@State<WishlistStateModel>({
  name: 'wishlist',
  defaults: {
    wishlist: null
  }
})
@Injectable()
export class WishlistState {
  constructor(private service: WishlistService) { }

  @Selector()
  static getWishlist(state: WishlistStateModel) {
    return state.wishlist;
  }

  @Action(GetWishlist)
  getWishlist({getState, setState}: StateContext<WishlistStateModel>, {userID}: GetWishlist) {
    return this.service.readWishlist(userID).pipe(tap((result) => {
      const state = getState();
      setState({
        ...state,
        wishlist: result
      });
    }));
  }
}
