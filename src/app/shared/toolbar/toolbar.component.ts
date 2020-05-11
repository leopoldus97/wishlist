import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/service/auth.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public picURL: string;

  constructor(public auth: AuthService, public us: UserService) { }

  ngOnInit(): void {
    const id = localStorage.getItem('id');
    this.us.readUserWithPic(id).subscribe(u => this.picURL = u.pictureURL);
  }

  logout() {
    this.picURL = null;
    this.auth.SignOut();
  }

}
