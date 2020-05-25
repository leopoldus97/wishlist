import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyCancelRoutingModule } from './buy-cancel-routing.module';
import { BuyCancelComponent } from './buy-cancel.component';
import { SharedModule } from '../shared.module';


@NgModule({
  declarations: [BuyCancelComponent],
  imports: [
    CommonModule,
    BuyCancelRoutingModule,
    SharedModule
  ]
})
export class BuyCancelModule { }
