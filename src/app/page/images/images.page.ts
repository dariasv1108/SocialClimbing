import { imprimirPantalla } from './../../core/model/util';
import { BlockService } from './../../service/block/block.service';
import { Component, OnInit } from '@angular/core';
import { IBlock } from 'src/app/interface/IBlock';
import { Router } from '@angular/router';

@Component({
  selector: 'app-images',
  templateUrl: './images.page.html',
  styleUrls: ['./images.page.scss'],
})
export class ImagesPage implements OnInit {

  private imageBlock = [];

  constructor(private blockServ: BlockService, private router: Router) {
    new imprimirPantalla('pagina', this.imageBlock);
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getImages();
  }

  async getImages() {
    this.imageBlock = []
    await this.blockServ.getAllBlockUser().subscribe(data => {
      data.forEach(block => {
        this.imageBlock.push(block.data())
      })
    });
    new imprimirPantalla('pagina', this.imageBlock);
  }

  openBlock(block) {
    this.blockServ.data = {
      nameBlock: block.name,
      imageBlock: block.imageBlock,
      level: block.level
    }
    this.router.navigate(['tabs/block'])
  }

  doRefresh(event) {
    this.getImages();
    setTimeout(() => {
      event.target.complete();
    }, 1500);
  }

}
