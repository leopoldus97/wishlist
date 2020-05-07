import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {tap} from 'rxjs/operators';
import {GetUser} from '../actions/user.action';
import {User} from '../models/user';
import {UserService} from '../services/user.service';

export interface UserStateModel {
  user: User;
}

@State<UserStateModel>({
  name: 'wishlist',
  defaults: {
    user: undefined
  }
})
@Injectable()
export class UserState {
  constructor(private service: UserService) { }

  @Selector()
  static currentUser(state: UserStateModel) {
    return state.user;
  }

  @Action(GetUser)
  getUser({getState, setState}: StateContext<UserStateModel>, {userID}: GetUser) {
    return this.service.getUser(userID).pipe(tap((result) => {
      const state = getState();
      setState({
        ...state,
        user: result
      });
    }));
  }


}
