import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared.module';
import { EditWishComponent } from './edit-wish/edit-wish.component';
import { CreateWishComponent } from './create-wish/create-wish.component';


@NgModule({
  declarations: [HomeComponent, EditWishComponent, CreateWishComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
