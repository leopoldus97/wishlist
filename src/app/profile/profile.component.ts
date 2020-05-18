import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {ImageCropperComponent} from '../shared/image-cropper/image-cropper.component';
import {Observable} from 'rxjs';
import {User} from '../shared/models/user';
import {Select, Store} from '@ngxs/store';
import {UserState} from '../shared/states/user.state';
import {GetUser} from '../shared/actions/user.action';
import {FileService} from '../shared/services/file.service';
import {GroupService} from '../shared/services/group.service';
import {Group} from '../shared/models/group';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit, OnDestroy {

  @Select(UserState.getUser) user: Observable<User>;
  @Select(UserState.getProfilePic) profilePic: Observable<string>;

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private fs: FileService,
    private store: Store,
    public gs: GroupService
  ) { }

  ngOnInit(): void {
    const userID = localStorage.getItem('id');
    this.store.dispatch(new GetUser(userID));
    this.gs.loadGroupsForUser(userID, 1);
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

  selectProfileImage(event) {
    if (event.target.files && event.target.files[0] && event.target.files[0].type.includes('image')) {
      this.openDialog(event);
    } else {
      this.snackBar.open('Need an image file!');
    }
  }

  ngAfterViewInit() {
    document.querySelector('body').classList.add('login');
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('login');
  }

  openDialog(event): void {
    const dialogRef = this.dialog.open(ImageCropperComponent, {
      height: 'auto',
      width: 'auto',
      data: event
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed.');
      const userID = localStorage.getItem('id');
      this.fs.uploadPicture(result).then(() => {
        this.store.dispatch(new GetUser(userID));
      });
    });
  }

}
