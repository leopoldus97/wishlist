import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AwayComponent} from './away.component';


const routes: Routes = [
  {
    path: '',
    component: AwayComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AwayRoutingModule { }
