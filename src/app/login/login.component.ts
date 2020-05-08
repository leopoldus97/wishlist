import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import {AuthService} from '../shared/auth/service/auth.service';
import {FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

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
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
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
