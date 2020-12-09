import { Subscription } from 'rxjs';
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
  private subscription: Subscription;

  constructor(private afAuth: AuthService, private router: Router,
    private alert: AlertController, private afStore: DataService, private loadingCtrl: LoadingController) { }

  async login(remember, result) {
    await this.afAuth.setUser(this.user);
    if (result == true) {
      await this.showLoading('Authenticating...');
      new imprimirPantalla('login serivce', await this.afAuth.signOn())
      if (await this.afAuth.signOn()) {
        this.subscription = this.afAuth.generateUidUser().subscribe(async (data) => {
          new imprimirPantalla(data)
          if (window.localStorage.getItem('uidUser') != null) {
            this.afAuth.setUidUser(JSON.parse(window.localStorage.getItem('uidUser')));
          } else {
            this.afAuth.setUidUser(data.uid);
          }
          this.afStore.isUser(this.afAuth.getUidUser()).then(async (dataUno) => {
            if (remember) {
              const myObject = JSON.stringify(data.uid);
              window.localStorage.setItem('uidUser', myObject);
              new imprimirPantalla('uidUser', myObject);
            }
            await this.dismissLoading();
            this.showAlert('Welcome', 'Login successfully!!');
            new imprimirPantalla(dataUno, 'aki')
            if (dataUno) {
              await this.dismissLoading();
              this.router.navigate(['/tabs']);
            } else {
              new imprimirPantalla("Sing up profile");
              await this.dismissLoading();
              this.router.navigate(['/sing-up-profile']);
            }
            this.subscription.unsubscribe();
          }).catch(async (e) => {
            await this.dismissLoading();
            this.showAlert('Error', e.message);
          });
        })
      } else {
        await this.dismissLoading()
        this.showAlert('Error', "User dont't verified or not exist");
        window.localStorage.removeItem('idUser');
        window.localStorage.removeItem('uidUser');
        this.router.navigate(['/home']);
      };
    } else {
      await this.dismissLoading()
      this.showAlert('Error', "Bad fields");
    }
  }
  async forgotPassword(email) {
    await this.showLoading('Authenticating...');
    this.afAuth.forgotPassword(email).then(async () => {
      await this.dismissLoading();
      this.showAlert('Message', 'Email send');
      this.router.navigate(['/home']);
    }).catch(async () => {
      await this.dismissLoading();
      this.showAlert('Error', 'Check the email address');
      this.router.navigate(['/home']);
    })
  }
  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
  dismissLoading() {
    new imprimirPantalla('apagando', this.loading)
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  }
  async showLoading(message: string) {
    await this.loadingCtrl.create({
      message
    }).then((overlay) => {
      this.loading = overlay;
      new imprimirPantalla(this.loading)
      this.loading.present();
    });
  }
  async logOut() {
    await this.afAuth.logOut().then((a) => {
      window.localStorage.removeItem('idUser');
      window.localStorage.removeItem('uidUser');
      this.router.navigate(['/home']);
    }).catch((error) => {
      this.showAlert('ERROR', error);
    });

  }
  //Get & Set
  public get user(): IUser {
    return this._user;
  }
  public set user(value: IUser) {
    this._user = value;
  }

}
