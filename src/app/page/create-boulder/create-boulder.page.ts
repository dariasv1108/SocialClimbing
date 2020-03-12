import { imprimirPantalla } from './../../core/model/util';
import { BoulderService } from './../../service/boulder/boulder.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';

declare var google;

import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { IBoulder } from 'src/app/interface/IBoulder';

@Component({
  selector: 'app-create-boulder',
  templateUrl: './create-boulder.page.html',
  styleUrls: ['./create-boulder.page.scss'],
})
export class CreateBoulderPage implements OnInit {

  private mapRef = null;
  private position: any;
  private markers = [];
  private boulder: IBoulder = {}

  constructor(
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    private modalCrtl: ModalController,
    private servBoulder : BoulderService,
  ) {
    this.servBoulder.data=this.boulder;
  }
  async ngOnInit() {
    this.position = await this.getLocation();
    this.loadMap(this.position);
  }
  async loadMap(position) {
    const loading = await this.loadingCtrl.create();
    loading.present();
    const myLatLng = position;
    const mapEle = document.getElementById('map');
    this.mapRef = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
    google.maps.event.addListener(this.mapRef, "click", function (e) {
      myLatLng.lat = e.latLng.lat()
      myLatLng.lng = e.latLng.lng()
    });
    this.position=myLatLng;
    google.maps.event
      .addListener(this.mapRef, 'idle', () => {
        loading.dismiss();
        this.addMaker(myLatLng.lat, myLatLng.lng);
      });

  }
  private clearMarkers() {
    this.setMapOnAll(null);
  }
  private setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }
  private addMaker(lat: number, lng: number) {
    this.clearMarkers()
    var marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.mapRef,
      title: 'Hello World!'
    });
    this.markers.push(marker);
  }
  private async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
  }
  private back() {
    this.modalCrtl.dismiss()
  }
  private createBoulder(){
    this.boulder.position=this.position;
    this.servBoulder.addBoulder();
  }

}
