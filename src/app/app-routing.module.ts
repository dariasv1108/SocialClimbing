import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./page/home/home.module').then( m => m.HomePageModule)},
  {
    path: 'camera',
    loadChildren: () => import('./page/camera/camera.module').then( m => m.CameraPageModule)
  },
  {
    path: 'followers',
    loadChildren: () => import('./page/followers/followers.module').then( m => m.FollowersPageModule)
  },
  {
    path: 'images',
    loadChildren: () => import('./page/images/images.module').then( m => m.ImagesPageModule)
  },
  {
    path: 'mapa',
    loadChildren: () => import('./page/mapa/mapa.module').then( m => m.MapaPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./page/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./page/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'sing-up',
    loadChildren: () => import('./page/sign-up/sing-up.module').then( m => m.SingUpPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./page/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./page/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'sing-up-profile',
    loadChildren: () => import('./page/sing-up-profile/sing-up-profile.module').then( m => m.SingUpProfilePageModule)
  },
  // {
  //   path: 'create-boulder',
  //   loadChildren: () => import('./page/create-boulder/create-boulder.module').then( m => m.CreateBoulderPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
