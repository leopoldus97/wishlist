import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SharedModule } from '../shared.module';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ToolbarComponent,ImageCropperComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ToolbarComponent,
    ImageCropperComponent
  ]
})
export class SharedComponentsModule { }
