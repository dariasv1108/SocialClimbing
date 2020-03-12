import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateBoulderPageRoutingModule } from './create-boulder-routing.module';

import { CreateBoulderPage } from './create-boulder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateBoulderPageRoutingModule
  ],
  declarations: [CreateBoulderPage]
})
export class CreateBoulderPageModule {}
