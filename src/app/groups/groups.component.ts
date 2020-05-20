import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {UserState} from '../shared/states/user.state';
import {Observable} from 'rxjs';
import {User} from '../shared/models/user';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {FileService} from '../shared/services/file.service';
import {GroupService} from '../shared/services/group.service';
import {Router} from '@angular/router';
import {GetUser} from '../shared/actions/user.action';
import {Group} from '../shared/models/group';
import {Member} from '../shared/models/member';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  @Select(UserState.getUser) user: Observable<User>;
  @Select(UserState.getProfilePic) profilePic: Observable<string>;
  userID: string;
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private fs: FileService,
    private store: Store,
    public gs: GroupService,
    private router: Router
  ) { this.userID = localStorage.getItem('id'); }

  ngOnInit(): void {

    this.store.dispatch(new GetUser(this.userID));
    this.gs.loadGroupsForUser(this.userID, 1);
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
}
