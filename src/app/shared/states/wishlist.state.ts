import {Injectable} from '@angular/core';
import {WishlistService} from '../services/wishlist.service';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {CreateWishlist, DeleteWishlist, GetWishlist, UpdateWishlist} from '../actions/wishlist.action';
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

  @Action(CreateWishlist)
  createWishlist({getState, setState}: StateContext<WishlistStateModel>, {userID, wl}: CreateWishlist) {
    return this.service.createWishList(userID, wl).then((result) => {
      const state = getState();
      setState({
        ...state,
        wishlist: wl
      });
    });
  }

  @Action(UpdateWishlist)
  updateWishlist({getState, setState}: StateContext<WishlistStateModel>, {userID, wl}: UpdateWishlist) {
    return this.service.updateWishlist(userID, wl).then((result) => {
      const state = getState();
      setState({
        ...state,
        wishlist: wl
      });
    });
  }

  @Action(DeleteWishlist)
  deleteWishlist({getState, setState}: StateContext<WishlistStateModel>, {userID}: DeleteWishlist) {
    return this.service.deleteWishlist(userID).then((result) => {
      const state = getState();
      setState({
        ...state,
        wishlist: null
      });
    });
  }
}
