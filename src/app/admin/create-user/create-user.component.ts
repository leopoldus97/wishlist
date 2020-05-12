import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {User} from '../../shared/models/user';
import {Store} from '@ngxs/store';
import {CreateUser} from '../../shared/actions/user.action';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  userForm = this.fb.group({
    email: '',
    firstname: '',
    lastname: '',
    nickname: '',
  });

  password: string;
  password2: string;


  constructor(
    private fb: FormBuilder,
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  createUser() {
    const user: User = this.userForm.value;
    this.store.dispatch(new CreateUser(user, this.password));
  }

}
