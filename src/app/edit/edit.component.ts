import {Component, Inject, OnInit} from '@angular/core';
import {Wish} from '../shared/models/wish';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  wish: Wish;
  wishForm = this.fb.group({
    name: '',
    description: '',
    url: ''
  });

  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.wishForm.patchValue({
      name: this.data.wish.name,
      description: this.data.wish.description,
      url: this.data.wish.url
  });
  }

  editWish(){
    console.log('Wish edited');
    this.wish = this.wishForm.value;
    this.dialogRef.close(this.wish);
  }

  cancel(){
    console.log('Process of editing cancelled');
    this.dialogRef.close(true);
  }

  remove() {
    console.log('wish removed');
    this.dialogRef.close(false);
  }
}
