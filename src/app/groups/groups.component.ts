import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {UserState} from '../shared/states/user.state';
import {Observable} from 'rxjs';
import {User} from '../shared/models/user';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FileService} from '../shared/services/file.service';
import {GroupService} from '../shared/services/group.service';
import {Router} from '@angular/router';
import {GetTemporaryUser, GetUser} from '../shared/actions/user.action';
import {Group} from '../shared/models/group';
import {Member} from '../shared/models/member';
import {MatDialog} from '@angular/material/dialog';
import {AddMembersComponent} from './add-member/add-members.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  @Select(UserState.getUser) user: Observable<User>;
  userID: string;
  constructor(
    private snackBar: MatSnackBar,
    private fs: FileService,
    private store: Store,
    public gs: GroupService,
    private router: Router,
    private dialog: MatDialog,
  ) { this.userID = localStorage.getItem('id'); }

  ngOnInit(): void {
    const id = localStorage.getItem('id');
    if (id === null) {
      this.router.navigate(['/login']);
    }
    this.store.dispatch(new GetUser(this.userID));
    this.gs.loadGroupsForUser(this.userID);
  }
  getCurrentGroups(): Group[] {
    return this.gs.getCurrentGroups();
  }

  getPrevGroupList(userID: string, loadLimit?: number) {
    this.gs.prevGroupsForUser(userID, loadLimit);
  }

  getNextGroupList(userID: string, loadLimit?: number) {
    this.gs.nextGroupsForUser(userID, loadLimit);
  }
  showMember(member: Member) {
    if (this.userID !== member.uid) {
      localStorage.setItem('watchedMember', member.firstname);
      this.router.navigateByUrl('user/' + member.uid);
    }
  }

  createGroup(user: User, groupName: string) {
    const group: Group = {
      name: groupName,
      members: []
    };
    this.gs.createGroup(group, user);
  }

  /*joinGroup(user: User, groupID: string) {
    console.log(groupID);
    this.gs.joinGroup(user, groupID);
  }*/
  addMembers(group: Group) {
    const dialogRef = this.dialog.open(AddMembersComponent, {
      height: '300px',
      width: '300px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(memberToAdd => {
      if (memberToAdd == null) { return; }
      else {
        this.gs.addMemberToGroup(memberToAdd, group);
      }
    });
  }
}
