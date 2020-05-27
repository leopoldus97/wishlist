import { Component, OnInit } from '@angular/core';
import {Wish} from '../../shared/models/wish';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {Group} from '../../shared/models/group';

@Component({
  selector: 'app-create',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.scss']
})
export class AddMembersComponent implements OnInit {


  membersForm = this.fb.group({
    IDs: ''
  });

  constructor(
    public dialogRef: MatDialogRef<AddMembersComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }


  cancel(){
    console.log('Process cancelled');
    this.dialogRef.close(null);
  }

  addMembers() {
    console.log('member added');
    let member  = this.membersForm.value.IDs;
    member = member.replace(/\s/g, '');
    // const membersIdsList = members.split(',');
    this.dialogRef.close(member);
  }
}
