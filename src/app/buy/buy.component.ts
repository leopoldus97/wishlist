import { Component, OnInit } from '@angular/core';
import {Wish} from '../shared/models/wish';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<BuyComponent>,

  ) { }

  ngOnInit(): void {
  }

  buyWish(){
    console.log('Wish added');
    this.dialogRef.close(true);
  }

  cancel(){
    console.log('Process cancelled');

    this.dialogRef.close(null);
  }

}
