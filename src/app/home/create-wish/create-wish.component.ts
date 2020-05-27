import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Wish} from '../../shared/models/wish';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create',
  templateUrl: './create-wish.component.html',
  styleUrls: ['./create-wish.component.scss']
})
export class CreateWishComponent implements OnInit {

  wish: Wish;
  wishForm = this.fb.group({
    name: '',
    description: '',
    url: ''
  });

  constructor(
    public dialogRef: MatDialogRef<CreateWishComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  addWish(){
    console.log('Wish added');
    this.wish = this.wishForm.value;
    this.dialogRef.close(this.wish);
  }

  cancel(){
    console.log('Process cancelled');
    this.dialogRef.close(null);
  }

}
