import { MapaPage } from './../../page/mapa/mapa.page';
import { imprimirPantalla } from './../../core/model/util';
import { IUser } from './../../interface/IUser';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private _user: IUser;
  private loading;

  constructor(private afAuth: AuthService, private router: Router,
    private alert: AlertController, private afStore: DataService, private loadingCtrl: LoadingController) { }

  async login() {
    this.showLoading('Authenticating...');
    this.afAuth.setUser(this.user);
    if (await this.afAuth.signOn()) {
      this.afStore.isUser(this.afAuth.getCurrentUserUid()).then((dataUno) => {
        this.loading.dismiss();
        this.showAlert('Welcome', 'Login successfully!!');
        new imprimirPantalla(dataUno)
        if (dataUno) {
          this.router.navigate(['/tabs'])
        } else {
          new imprimirPantalla("Sing up profile")
          this.router.navigate(['/sing-up-profile'])
        }
      });
    } else {
      this.loading.dismiss();
      this.showAlert('Error', "User don't verified or bad fields");
    }
  }
  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
  showLoading(message: string) {
    this.loadingCtrl.create({
      message
    }).then((overlay) => {
      this.loading = overlay;
      this.loading.present();
    })
  }
  logOut() {
    this.router.navigate(['/home'])
    this.afAuth.logOut();

  }
  //Get & Set
  public get user(): IUser {
    return this._user;
  }
  public set user(value: IUser) {
    this._user = value;
  }


}
