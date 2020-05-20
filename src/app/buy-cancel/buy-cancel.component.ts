import {Component, Inject, OnInit} from '@angular/core';
import {Wish} from '../shared/models/wish';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-buy',
  templateUrl: './buy-cancel.component.html',
  styleUrls: ['./buy-cancel.component.scss']
})
export class BuyCancelComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<BuyCancelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  buyWish(){
    console.log('Wish bought');
    this.dialogRef.close(true);
  }
  stopBuying() {
    console.log('Wish canceled');
    this.dialogRef.close(true);
  }

  cancel(){
    console.log('Process cancelled');

    this.dialogRef.close(null);
  }

}
