import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';
import { SharedModule } from '../shared.module';
import { AddMembersComponent } from './add-member/add-members.component';
import { EditGroupComponent } from './edit-group/edit-group.component';


@NgModule({
  declarations: [GroupsComponent, AddMembersComponent, EditGroupComponent],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    SharedModule
  ]
})
export class GroupsModule { }
