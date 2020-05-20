import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {AwayComponent} from './away/away.component';
import {CreateUserComponent} from './admin/create-user/create-user.component';
import {GroupsComponent} from './groups/groups.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'groups', component: GroupsComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'user/:id', component: AwayComponent},
  {path: 'admin',
    children: [
      { path: 'create', component: CreateUserComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
