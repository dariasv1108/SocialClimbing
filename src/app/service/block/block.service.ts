import { imprimirPantalla } from './../../core/model/util';
import { IBlock } from './../../interface/IBlock';
import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { DataService } from '../data/data.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BlockService {
  private _data: IBlock;
  private loading;

  constructor(private router: Router, private alert: AlertController,
    private afStore: DataService, private afAuth: AuthService, private loadingCtrl: LoadingController,
    private modalCrtl: ModalController) {
  }

  addBlock() {
    this.showLoading('Creating...');
    this.data.idUser = this.afAuth.getUidUser();
    this.afStore.addBlock(this.data).then(docRef => {
      this.afStore.addImageBlock(this.data, docRef.id).then(() => {
        this.loading.dismiss();
        this.modalCrtl.dismiss();
        this.router.navigate(['/tabs/profile']);
      }).catch((err) => {
        this.loading.dismiss();
        this.showAlert("Error", "Error to saving Image");
      });
    }).catch((err) => {
      this.loading.dismiss();
      this.showAlert("Error", "Error to saving data");
    });
  }

  getAllBlockUser() {
    return this.afStore.getAllBlockUser(this.afAuth.getUidUser());
  }
  getAllBlockBoulder(idBoulder) {
    return this.afStore.getAllBlockBoulder(idBoulder);
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
  public get data(): IBlock {
    return this._data;
  }
  public set data(value: IBlock) {
    this._data = value;
  }
}
