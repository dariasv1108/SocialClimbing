import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoulderPage } from './boulder.page';

const routes: Routes = [
  {
    path: '',
    component: BoulderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoulderPageRoutingModule {}
