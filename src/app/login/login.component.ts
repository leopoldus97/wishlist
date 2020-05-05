import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  email: string;
  password: string;

  constructor(
    private authServ: AuthService
  ) { }

  ngOnInit(): void {
  }

  login(){
    this.authServ.SignIn(this.email, this.password);
  }

  ngAfterViewInit() {
    document.querySelector('body').classList.add('login');
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('login');
}

}
