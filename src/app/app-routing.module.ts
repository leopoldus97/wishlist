import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AwayComponent} from './away/away.component';
import {GroupsComponent} from './groups/groups.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  {path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  {path: 'groups', loadChildren: () => import('./groups/groups.module').then(m => m.GroupsModule)},
  {path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)},
  {path: 'user/:id', loadChildren: () => import('./away/away.module').then(m => m.AwayModule)},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
