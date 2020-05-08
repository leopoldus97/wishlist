import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ImageCroppedEvent, ImageCropperModule} from 'ngx-image-cropper';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {ImageCropperComponent} from '../shared/image-cropper/image-cropper.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit, OnDestroy {
  croppedImage: any = '';

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }
/*
  selectProfileImage(event: any) {
    this.imageChangedEvent = event;
    if (event.target.files && event.target.files[0] && event.target.files[0].type.includes('image')) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.picURL = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.snackBar.open('Need an image file!');
    }
  }
 */

  selectProfileImage(event) {
    if (event.target.files && event.target.files[0] && event.target.files[0].type.includes('image')) {
      this.openDialog(event.target.files[0]);
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
      width: 'auto',
      height: 'auto',
      data: event
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.croppedImage = result;
    });
  }

}
