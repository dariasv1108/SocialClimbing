import { BlockService } from './../../service/block/block.service';
import { IBlock } from './../../interface/IBlock';
import { Level } from './../../core/model/level';
import { BoulderService } from './../../service/boulder/boulder.service';
import { imprimirPantalla } from './../../core/model/util';
import { IBoulder } from './../../interface/IBoulder';
import { CreateBoulderPage } from './../create-boulder/create-boulder.page';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Platform, ModalController, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { IonicSelectableComponent } from 'ionic-selectable';


@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.page.html',
  styleUrls: ['./upload-image.page.scss'],
})

export class UploadImagePage implements OnInit {

  @Input() image;
  private background = new Image();
  private boulders: IBoulder[];
  private boulder: IBoulder;
  private bouldersSubscription: Subscription;
  private levels = Level;
  private block: IBlock = {};
  @ViewChild('imageCanvas', { static: false }) canvas: any;
  private ctx: CanvasRenderingContext2D;
  private canvasPosition: DOMRect;
  private canvasElement: any;

  constructor(private alert: AlertController, private plt: Platform, private modalCrtl: ModalController,
    private boulderService: BoulderService, private blockService: BlockService) {
    var bouldersAll = [];
    this.boulderService.getAllBoulder().subscribe(boulders => {
      boulders.forEach((boulder) => {
        let boul: IBoulder = {};
        boul.id = boulder.id;
        boul.name = boulder.data().name;
        boul.position = boulder.data().position;
        bouldersAll.push(boul);
      });
    });
    this.boulders = bouldersAll;
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.width = this.plt.width();
    this.canvasElement.height = this.plt.height() - (this.plt.height() * 0.40);
  }
  ionViewDidEnter() {
    this.ctx = this.canvasElement.getContext('2d');
    this.canvasPosition = this.canvasElement.getBoundingClientRect();
    this.setBackground();
  }

  private keys(): Array<string> {
    var keys = Object.keys(this.levels);
    return keys.slice(keys.length / 2);
  }

  private setBackground() {
    this.background.src = this.image;
    this.block.imageBlock = this.background.src;
    this.background.onload = () => {
      this.ctx.drawImage(this.background, 0, 0);
      // , this.canvasElement.width, this.plt.height() - (this.plt.height() * 0.20)
    }
  }
  private back() {
    this.modalCrtl.dismiss();
  }
  private async createBoulder() {
    const modal = await this.modalCrtl.create({
      component: CreateBoulderPage,
      componentProps: {
      }
    });
    await modal.present();
  }
  private filterboulders(boulders: IBoulder[], text: string) {
    return boulders.filter(boulder => {
      return boulder.name.toLowerCase().indexOf(text) !== -1;
    });
  }
  private boulderChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.block.idBoulder = event.value.id;
    new imprimirPantalla('boulder:', event.value.id);
  }
  private searchboulders(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    let text = event.text.trim().toLowerCase();
    event.component.startSearch();

    if (this.bouldersSubscription) {
      this.bouldersSubscription.unsubscribe();
    }

    if (!text) {
      // Close any running subscription.
      if (this.bouldersSubscription) {
        this.bouldersSubscription.unsubscribe();
      }

      event.component.items = this.boulders;
      event.component.endSearch();
      return;
    }
    var bouldersAll = [];

    this.bouldersSubscription = this.boulderService.getAllBoulder().subscribe(boulders => {
      boulders.forEach((boulder) => {
        let boul: IBoulder = {};
        boul.id = boulder.id;
        boul.name = boulder.data().name;
        boul.position = boulder.data().position;
        bouldersAll.push(boul);
      });
      if (this.bouldersSubscription.closed) {
        return;
      }
      if (event.component.items.length === 0) {
        this.showAlert('Boulder not found', 'Would you like create a boulder?');
      }
      event.component.items = this.filterboulders(bouldersAll, text);
      event.component.endSearch();
    });

  }
  private async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: [{
        text: 'Create Boulder',
        handler: () => {
          this.createBoulder();
        }
      }, {
        text: 'Cancel',
        role: 'cancel'
      }]
    });
    await alert.present();
  }
  private upload() {
    this.blockService.data = this.block;
    this.blockService.addBlock();
  }
}
