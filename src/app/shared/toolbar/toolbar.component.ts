import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/service/auth.service';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {UserState} from '../states/user.state';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Select(UserState.getProfilePic) profilePic: Observable<string>;

  constructor(public auth: AuthService) {
  }

  ngOnInit(): void { }

  logout() {
    this.auth.SignOut();
  }

}
