import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AwayRoutingModule } from './away-routing.module';
import { AwayComponent } from './away.component';
import { SharedModule } from '../shared.module';
import {BuyCancelComponent} from './buy-cancel/buy-cancel.component';


@NgModule({
  declarations: [AwayComponent, BuyCancelComponent],
  imports: [
    CommonModule,
    AwayRoutingModule,
    SharedModule
  ]
})
export class AwayModule { }
