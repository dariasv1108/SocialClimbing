import { IBoulder } from 'src/app/interface/IBoulder';
import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { DataService } from '../data/data.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BoulderService {

  private _data: IBoulder;
  private loading;

  constructor(private alert: AlertController,
    private afStore: DataService, private loadingCtrl: LoadingController, private afAuth: AuthService, private modalCrtl: ModalController, ) { }

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

  getAllBoulder() {

  }

  async findBoulder(startAt, endAt) {
    var boulders = [];
    await this.afStore.findBoulder(startAt, endAt).subscribe((data) => {
      boulders = data;
    });
    return boulders
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


  public get data(): IBoulder {
    return this._data;
  }
  public set data(value: IBoulder) {
    this._data = value;
  }

}
