import { IProfile } from './../../interface/IProfile';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { DataService } from '../data/data.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataProfileServiceService {

  private _data: IProfile;
  private loading;

  constructor(private router: Router, private alert: AlertController,
    private afStore: DataService, private afAuth: AuthService, private loadingCtrl: LoadingController) {
  }

  addUser() {
    this.showLoading('Creating...')
    this.afStore.addImage(this.data, this.afAuth.getCurrentUserUid()).then(() => {
      this.afStore.addUsers(this.data, this.afAuth.getCurrentUserUid()).then(() => {
        this.loading.dismiss();
        this.router.navigate(['/tabs'])
      }).catch((err) => {
        this.loading.dismiss();
        this.showAlert("Error", "Error to saving data")
      });
    }).catch((err) => {
      this.loading.dismiss();
      this.showAlert("Error", "Error to saving Image")
    });

  }

  async getUser() {
    var user;
    await this.afStore.getProfile(this.afAuth.getCurrentUserUid()).then((data) => {
      user = data
    });
    return user;
  }
  async getImageProfile() {
    var image;
    await this.afStore.getImageProfile(this.afAuth.getCurrentUserUid()).then((data) => {
      image = data
    });
    return image;
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
  //Get & Set
  public get data(): IProfile {
    return this._data;
  }
  public set data(value: IProfile) {
    this._data = value;
  }

}
