import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import {AuthService} from '../shared/auth/service/auth.service';
import {FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {GetUser} from '../shared/actions/user.action';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  loginValidatorForm = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.email,
    ]],
    password: ['', [
      Validators.required,
      Validators.min(6)
    ]]
  });

  matcher = new MyErrorStateMatcher();

  constructor(
    private authServ: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store
  ) { }

  ngOnInit(): void {
    if (this.authServ.getUserID() !== null) {
      this.router.navigate(['/home']);
    }
  }

  f() {
    return this.loginValidatorForm.controls;
  }

  login(){
    this.authServ.SignIn(this.f().email.value, this.f().password.value);
  }

  ngAfterViewInit() {
    document.querySelector('body').classList.add('login');
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('login');
  }
}
