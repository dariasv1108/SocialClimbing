import { IBlock } from './../../interface/IBlock';
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
    await firebase.storage().ref().child('Users').child(userId).child('imageProfile').getDownloadURL().then(function (url) {
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
  addBlock(block) {
    return this.afStoreSv.collection('block').add(block);
  }
  addUsers(user: IProfile, idUser: string) {
    return this.afStoreSv.collection('users').doc(idUser).collection('data').doc('profile').set(user);
  }
  addBoulder(boulder: IBoulder) {
    new imprimirPantalla(boulder)
    return this.afStoreSv.collection('boulder').add(boulder);
  }
  newFollower(boulder: IBoulder) {
    new imprimirPantalla(boulder)
    return this.afStoreSv.collection('boulder').doc(boulder.id).update({
      "follower" : boulder.follower
    })
  }
  addImageProfile(user: IProfile, idUser: string) {
    return firebase.storage().ref().child('Users').child(idUser).child('imageProfile').putString(user.imageProfile, 'data_url');
  }
  addImageBlock(block: IBlock, idBlock: string) {
    new imprimirPantalla(idBlock, block)
    return firebase.storage().ref().child('Block').child(idBlock).child('block').putString(block.imageBlock, 'data_url');
  }
  getAllBoulder() {
    return this.afStoreSv.collection('boulder', ref => ref.orderBy('name')).get();
  }
  getAllBlockUser(idUser: string) {
    return this.afStoreSv.collection('block', ref => ref.where('idUser', '==', idUser)).get()
  }
  getAllBlockBoulder(idBoulder: string) {
    return this.afStoreSv.collection('block', ref => ref.where('idBoulder', '==', idBoulder)).get()
  }
  getImagesBlockUser(idUser: string) {
    var blocks = [];
    this.afStoreSv.collection('block', ref => ref.where('idUser', '==', idUser)).get().subscribe((data) => {
      data.forEach(async (block) => {
        new imprimirPantalla('block', block.data().name);
        var image = '';
        await firebase.storage().ref().child('Block').child(block.ref.id).child('block').getDownloadURL().then(function (url) {
          image = url;
          blocks.push(image);
        }).catch(function (error) {
          // Handle any errors
        });
      });
      new imprimirPantalla(blocks);
    });
    return blocks;
  }
  getImagesBlockBoulder(idBoulder: string) {
    var blocks = [];
    this.afStoreSv.collection('block', ref => ref.where('idBoulder', '==', idBoulder)).get().subscribe((data) => {
      data.forEach(async (block) => {
        new imprimirPantalla('block', block.data().name);
        var image = '';
        await firebase.storage().ref().child('Block').child(block.ref.id).child('block').getDownloadURL().then(function (url) {
          image = url;
          blocks.push(image);
        }).catch(function (error) {
          // Handle any errors
        });
      });
      new imprimirPantalla(blocks);
    });
    return blocks;
  }
  updateImageProfile(user: IProfile, idUser: string) {
    firebase.storage().ref().child('Users').child(idUser).child('imageProfile').delete().then(() => {
    })
    return firebase.storage().ref().child('Users').child(idUser).child('imageProfile').putString(user.imageProfile, 'data_url');
  }
  updateProfile(user: IProfile, idUser: string) {
    return this.afStoreSv.collection('users').doc(idUser).collection('data').doc('profile').update(user);
  }
}
