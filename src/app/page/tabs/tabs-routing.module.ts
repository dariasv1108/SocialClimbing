import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { ProfilePageModule } from '../profile/profile.module';
import { CameraPageModule } from '../camera/camera.module';
import { MapaPageModule } from '../mapa/mapa.module';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'profile',
        loadChildren: () => ProfilePageModule,
      },
      {
        path: 'map',
        loadChildren: () => MapaPageModule,
      },
      {
        path: 'camera',
        loadChildren: () => CameraPageModule,
      },
      {
        path: '',
        redirectTo: '/tabs/profile/images',
        pathMatch: 'full'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
