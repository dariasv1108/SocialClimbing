import { CreateBoulderPage } from './page/create-boulder/create-boulder.page';
import { CreateBoulderPageModule } from './page/create-boulder/create-boulder.module';
import { UploadImagePageModule } from './page/upload-image/upload-image.module';
import { UploadImagePage } from './page/upload-image/upload-image.page';
import { Base64 } from '@ionic-native/base64/ngx';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Camera } from '@ionic-native/camera/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import firebaseConfig from './firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgModule } from '@angular/core';
import { IonicGestureConfig } from './core/model/IonicGestureConfig';
import { LongPressModule } from 'ionic-long-press';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [UploadImagePage,CreateBoulderPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    UploadImagePageModule,
    CreateBoulderPageModule,
    LongPressModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig},
    Base64ToGallery,
    Base64,
    Geolocation,

    // { provide: Camera, useClass: CameraMock }
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }

