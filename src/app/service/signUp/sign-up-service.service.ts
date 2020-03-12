import { imprimirPantalla } from '../../core/model/util';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { IUser } from 'src/app/interface/IUser';

@Injectable({
  providedIn: 'root'
})
export class SignUpServiceService {

  private _user: IUser;
  private loading;

  constructor(private afAuth: AngularFireAuth, private router: Router, 
    private alert: AlertController, private loadingCtrl: LoadingController) { }

  async register() {
    this.showLoading('Authenticating...');
    await this.signUp().then(() => {
      const { user } = this;
      if (user.password != user.confirmPassword) {
        this.loading.dismiss();
        this.showAlert('Error', "Password don't match");
        new imprimirPantalla(["Password don't match"]);
      } else {
        this.loading.dismiss();
        this.showAlert('Welcome', 'Sent email');
        this.router.navigateByUrl('/home');
      }
    });
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
  private async signUp() {
    const { user } = this;
    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      res.user.sendEmailVerification();
      new imprimirPantalla(res);
    } catch (err) {
      new imprimirPantalla(err)
    }
  }
  //Get & Set
  public get user(): IUser {
    return this._user;
  }
  public set user(value: IUser) {
    this._user = value;
  }
}
