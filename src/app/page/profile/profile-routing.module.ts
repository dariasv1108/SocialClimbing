import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';
import { ImagesPageModule } from '../images/images.module';
import { FollowersPageModule } from '../followers/followers.module';
import { SettingsPageModule } from '../settings/settings.module';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    children: [
      {
        path: 'images',
        loadChildren:  () => ImagesPageModule
      },
      {
        path: 'followers',
        loadChildren: () => FollowersPageModule
      },
      {
        path: 'settings',
        loadChildren: () => SettingsPageModule
      },
      {
        path: '',
        redirectTo: 'images',
        pathMatch: 'full'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
