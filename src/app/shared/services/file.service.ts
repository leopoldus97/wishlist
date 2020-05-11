import { Injectable } from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {Observable, of} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  task: AngularFireUploadTask;

  snapshot: Observable<any>;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

  startUpload(blob: Blob): AngularFireUploadTask {

    if (blob.type !== 'image/png' && blob.type !== 'image/jpeg') {
      console.error('unsupported file');
      return;
    }

    const path = localStorage.getItem('id') + '/profile';

    this.task = this.storage.upload(path, blob);

    this.snapshot = this.task.snapshotChanges();
    this.db.collection('users').doc<User>(localStorage.getItem('id'))
      .update( { pictureURL: path } ).catch(console.log);

    return this.task;
  }

  uploadPicture(imageURL): AngularFireUploadTask {
    const block = imageURL.split(';');
    const contentType = block[0].split(':')[1];
    const realData = block[1].split(',')[1];

    const blob = this.b64toBlob(realData, contentType);
    return this.startUpload(blob);
  }

  b64toBlob(b64Data, contentType, sliceSize?) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  getDownloadURL(path: string): Observable<any> {
    if (!path) {
      return of(null);
    }
    return this.storage.ref(path).getDownloadURL();
  }

}
