import { IBoulder } from 'src/app/interface/IBoulder';
import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { DataService } from '../data/data.service';
import { imprimirPantalla } from 'src/app/core/model/util';
import { isNullOrUndefined } from 'util';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class BoulderService {

  private _data: IBoulder;
  private loading;
  private _token:string;

  constructor(private alert: AlertController,
    private afStore: DataService, private loadingCtrl: LoadingController, private afAuth: AngularFireAuth,
    private modalCrtl: ModalController,) { 
      this.afAuth.idToken.subscribe(data=>{
        this._token=data;
      })
    }

  addBoulder() {
    this.showLoading('Creating...')
    this.afStore.addBoulder(this.data).then(() => {
      this.loading.dismiss();
      this.modalCrtl.dismiss();
    }).catch((err) => {
      this.loading.dismiss();
      this.showAlert("Error", "Error to saving data")
    });
  }

  newFollow() {
    new imprimirPantalla(this.data.follower)
    if (isNullOrUndefined(this.data.follower)) {
        this._data.follower = [this.token];
    } else {
        this._data.follower.push(this.token);
    }
    this.afStore.newFollower(this.data).then(() => {
    }).catch((err) => {
      this.showAlert("Error", "Error to follow")
    });
  }

  unFollow() {
    let index = 0;
    this.afAuth.idToken.subscribe(data=>{
      index = this.data.follower.indexOf(data)
    })
    if (index > -1) {
      this.data.follower.splice(index, 1);
    }
    this.afStore.newFollower(this.data).then(() => {
    }).catch((err) => {
      this.showAlert("Error", "Error to unfollow")
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
    });
  }
  getAllBoulder() {
    return this.afStore.getAllBoulder();
  }

  public get data(): IBoulder {
    return this._data;
  }
  public get token(): string {
    return this._token;
  }
  public set data(value: IBoulder) {
    this._data = value;
  }
  public set token(value: string) {
    this._token = value;
  }

}
