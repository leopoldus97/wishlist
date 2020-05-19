import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {environment} from '../environments/environment';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './home/home.component';
import {NgxsModule} from '@ngxs/store';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {WishlistState} from './shared/states/wishlist.state';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatSliderModule} from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatRippleModule} from '@angular/material/core';
import {ToolbarComponent} from './shared/toolbar/toolbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {ImageCropperModule} from 'ngx-image-cropper';
import {ProfileComponent} from './profile/profile.component';
import {MatMenuModule} from '@angular/material/menu';
import {ImageCropperComponent} from './shared/image-cropper/image-cropper.component';
import {MatDialogModule} from '@angular/material/dialog';
import {CreateComponent} from './create/create.component';
import {UserState} from './shared/states/user.state';
import {AwayComponent} from './away/away.component';
import {CreateUserComponent} from './admin/create-user/create-user.component';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatGridListModule} from '@angular/material/grid-list';
import { EditComponent } from './edit/edit.component';
import { BuyComponent } from './buy/buy.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ToolbarComponent,
    ProfileComponent,
    ImageCropperComponent,
    CreateComponent,
    AwayComponent,
    CreateUserComponent,
    EditComponent,
    BuyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    NgxsModule.forRoot([WishlistState, UserState]),
    NgxsStoragePluginModule.forRoot({
      key: ['user']
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule,
    MatSliderModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
    MatRippleModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    ImageCropperModule,
    MatMenuModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatGridListModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
