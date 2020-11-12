import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoulderPageRoutingModule } from './boulder-routing.module';

import { BoulderPage } from './boulder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoulderPageRoutingModule
  ],
  declarations: [BoulderPage]
})
export class BoulderPageModule {}
