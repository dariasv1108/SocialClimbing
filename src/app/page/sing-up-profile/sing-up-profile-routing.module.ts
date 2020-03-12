import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingUpProfilePage } from './sing-up-profile.page';

const routes: Routes = [
  {
    path: '',
    component: SingUpProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingUpProfilePageRoutingModule {}
