import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/service/auth.service';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {UserState} from '../states/user.state';
import {GetUser} from '../actions/user.action';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Select(UserState.getProfilePic) profilePic: Observable<string>;

  constructor(public auth: AuthService, private store: Store) {
    this.store.dispatch(new GetUser(localStorage.getItem('id')));
  }

  ngOnInit(): void { }

  logout() {
    this.auth.SignOut();
  }

}
