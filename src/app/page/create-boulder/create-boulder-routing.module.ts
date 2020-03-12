import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateBoulderPage } from './create-boulder.page';

const routes: Routes = [
  {
    path: '',
    component: CreateBoulderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateBoulderPageRoutingModule {}
