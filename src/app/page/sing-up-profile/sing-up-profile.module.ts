import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingUpProfilePageRoutingModule } from './sing-up-profile-routing.module';

import { SingUpProfilePage } from './sing-up-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingUpProfilePageRoutingModule
  ],
  declarations: [SingUpProfilePage]
})
export class SingUpProfilePageModule {}
