import { HomeGuard } from './guard/guardHome/home.guard';
import { IsUserGuard } from './guard/guardIsUser/is-user.guard';
import { AuthGuard } from './guard/guardAuth/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./page/home/home.module').then(m => m.HomePageModule), canActivate: [HomeGuard] },
  {
    path: 'camera',
    loadChildren: () => import('./page/camera/camera.module').then(m => m.CameraPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'followers',
    loadChildren: () => import('./page/followers/followers.module').then(m => m.FollowersPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'images',
    loadChildren: () => import('./page/images/images.module').then(m => m.ImagesPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'mapa',
    loadChildren: () => import('./page/mapa/mapa.module').then(m => m.MapaPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./page/profile/profile.module').then(m => m.ProfilePageModule), canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('./page/settings/settings.module').then(m => m.SettingsPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'sing-up',
    loadChildren: () => import('./page/sign-up/sing-up.module').then(m => m.SingUpPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./page/tabs/tabs.module').then(m => m.TabsPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./page/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'sing-up-profile',
    loadChildren: () => import('./page/sing-up-profile/sing-up-profile.module').then(m => m.SingUpProfilePageModule),
    canActivate: [IsUserGuard]
  },
  {
    path: 'boulder',
    loadChildren: () => import('./page/boulder/boulder.module').then(m => m.BoulderPageModule),
    canActivate: [IsUserGuard]
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
