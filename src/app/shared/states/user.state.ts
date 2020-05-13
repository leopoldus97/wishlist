import {User} from '../models/user';
import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {UserService} from '../services/user.service';
import {tap} from 'rxjs/operators';
import {CreateUser, GetUser, UpdateUser} from '../actions/user.action';
import {AuthService} from '../auth/service/auth.service';

export class UserStateModel {
  currentUser: User;
  profilePic: string;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    currentUser: null,
    profilePic: ''
  }
})
@Injectable()
export class UserState {
  constructor(
    private us: UserService,
    private as: AuthService
  ) { }

  @Selector()
  static getUser(state: UserStateModel) {
    return state.currentUser;
  }

  @Selector()
  static getProfilePic(state: UserStateModel) {
    return state.profilePic;
  }

  @Action(GetUser)
  getUser({getState, setState}: StateContext<UserStateModel>, {userID}: GetUser) {
    return this.us.readUserWithPic(userID).pipe(tap((result) => {
      const state = getState();
      setState({
        ...state,
        currentUser: result,
        profilePic: result.pictureURL
      });
    }));
  }

  @Action(CreateUser)
  createUser({getState, setState}: StateContext<UserStateModel>, {user, password}: CreateUser) {
    return this.as.SignUp(user, password);
  }

  @Action(UpdateUser)
  updateUser({getState, patchState}: StateContext<UserStateModel>, {user}: UpdateUser) {
    return this.us.updateUser(user).then(() => {
      const state = getState();
      patchState({
        ...state,
        currentUser: user
      });
    });
  }
}
