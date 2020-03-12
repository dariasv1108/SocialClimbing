import { IBoulder } from 'src/app/interface/IBoulder';
import { imprimirPantalla } from './../../core/model/util';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { isNullOrUndefined } from 'util';
import { IProfile } from 'src/app/interface/IProfile';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userLogData: IProfile;

  constructor(private afStoreSv: AngularFirestore) { }

  async isUser(idUser: string) {
    var resultUser = false;
    await this.getUsers(idUser).then((data) => {
      resultUser = data;
    });

    if (resultUser) {
      return true;
    } else {
      return false;
    }
  }
  async getUsers(idUser: string): Promise<boolean> {
    return await new Promise((resolve, reject) => {
      this.afStoreSv.collection("users").doc(idUser).collection('data').doc('profile').valueChanges().subscribe(data => {
        if (!isNullOrUndefined(data)) {
          new imprimirPantalla('true')
          resolve(true);
        } else {
          new imprimirPantalla('false')
          resolve(false);
        }
      }, reject);
    });
  }
  async getImageProfile(userId: string) {
    var image = "";
    await firebase.storage().ref().child(userId).child('imageProfile').getDownloadURL().then(function (url) {
      image = url;
    }).catch(function (error) {
      // Handle any errors
    });
    return image;
  }
  async getProfile(idUser: string) {
    return await new Promise((resolve, reject) => {
      this.afStoreSv.collection('users').doc(idUser).collection('data').doc('profile').valueChanges().subscribe((data) => {
        if (!isNullOrUndefined(data)) {
          resolve(data);
        }
      }, reject);
    });
  }
  addBlock(idUser, block) {
    return this.afStoreSv.collection('users').doc(idUser).collection('block').doc(block.id).set(block);
  }
  addUsers(user: IProfile, idUser: string) {
    return this.afStoreSv.collection('users').doc(idUser).collection('data').doc('profile').set(user);
  }
  addBoulder(boulder: IBoulder) {
    new imprimirPantalla(boulder)
    return this.afStoreSv.collection('boulder').add(boulder);
  }
  addImage(user: IProfile, idUser: string) {
    return firebase.storage().ref().child(idUser).child('imageProfile').putString(user.imageProfile, 'data_url')
  }
  findBoulder(start, end) {
    return this.afStoreSv.collection('boulder', ref => ref.limit(4).orderBy('name').startAt(start).endAt(end)).valueChanges();
  }
  getAllBoulder() {
    return this.afStoreSv.collection('boulder', ref => ref.orderBy('name')).valueChanges();
  }
}
