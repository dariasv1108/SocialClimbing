import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

declare var google;

import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { IBoulder } from 'src/app/interface/IBoulder';
import { BoulderService } from 'src/app/service/boulder/boulder.service';
import { element } from 'protractor';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  private mapRef = null;
  private position: any;
  private markers = [];

  constructor(
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    private servBoulder: BoulderService,
  ) {

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
    // google.maps.event.addListener(this.mapRef, "click", function (e) {
    //   myLatLng.lat = e.latLng.lat()
    //   myLatLng.lng = e.latLng.lng()
    // });
    this.position = myLatLng;
    await this.servBoulder.getAllBoulder().subscribe(boulders => {
      boulders.forEach((boulder) => {
        let boul: IBoulder = {};
        boul.id = boulder.id;
        boul.name = boulder.data().name;
        boul.position = boulder.data().position;
        google.maps.event
          .addListener(this.mapRef, 'idle', () => {
            this.addMaker(boul.position.lat, boul.position.lng);
          });
      });
      loading.dismiss();
    });
  }

  private async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
  }

  private addMaker(lat: number, lng: number) {
    var marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.mapRef,
      title: 'Hello World!'
    });
    this.markers.push(marker);
  }
}
