import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {ImageCropperComponent} from '../shared/image-cropper/image-cropper.component';
import {FileService} from '../shared/services/file.service';
import {Observable} from 'rxjs';
import {User} from '../shared/models/user';
import {UserService} from '../shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit, OnDestroy {

  public user: Observable<User>;
  pic: any = '';

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private fs: FileService,
    private us: UserService
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    const userID = localStorage.getItem('id');
    this.user = this.us.readUserWithPic(userID);
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
      this.pic = result;
      this.fs.uploadPicture(result).then(a => {
        this.getCurrentUser();
      });
    });
  }

}
