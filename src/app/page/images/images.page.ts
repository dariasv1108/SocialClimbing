import { imprimirPantalla } from './../../core/model/util';
import { BlockService } from './../../service/block/block.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-images',
  templateUrl: './images.page.html',
  styleUrls: ['./images.page.scss'],
})
export class ImagesPage implements OnInit {

  private imageBlock;

  constructor(private blockServ: BlockService) {
    new imprimirPantalla('pagina', this.imageBlock);
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getImages();
  }

  async getImages() {
    this.imageBlock = await this.blockServ.getAllBlockUser();
  }

  doRefresh(event) {
    this.getImages();
    setTimeout(() => {
      event.target.complete();
    }, 1500);
  }

}
