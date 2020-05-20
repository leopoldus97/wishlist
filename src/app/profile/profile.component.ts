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
import {Member} from '../shared/models/member';
import {Router} from '@angular/router';
import {AuthService} from '../shared/auth/service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit, OnDestroy {

  @Select(UserState.getUser) user: Observable<User>;
  @Select(UserState.getProfilePic) profilePic: Observable<string>;
  userID: string;
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private fs: FileService,
    private store: Store,
    public gs: GroupService,
    public authService: AuthService
  ) { this.userID = localStorage.getItem('id'); }

  ngOnInit(): void {

    this.store.dispatch(new GetUser(this.userID));
    this.gs.loadGroupsForUser(this.userID, 1);
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
      this.fs.uploadPicture(result).then(() => {
        this.store.dispatch(new GetUser(this.userID));
      });
    });
  }

  sendLink(email: string) {
    this.authService.resetPassword(email);
  }
}
