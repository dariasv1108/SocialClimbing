import { Component, OnInit } from '@angular/core';
import { IBoulder } from 'src/app/interface/IBoulder';
import { BlockService } from 'src/app/service/block/block.service';
import { BoulderService } from 'src/app/service/boulder/boulder.service';

@Component({
  selector: 'app-boulder',
  templateUrl: './boulder.page.html',
  styleUrls: ['./boulder.page.scss'],
})
export class BoulderPage implements OnInit {

  private boulder: IBoulder = {};
  
  private imageBlock;

  constructor(private boulderService: BoulderService, private blockServ: BlockService) {
  }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.boulder = this.boulderService.data
    this.getImages();
  }

  async getImages() {
    this.imageBlock = await this.blockServ.getAllBlockBoulder(this.boulder.id);
  }

  doRefresh(event) {
    this.getImages();
    setTimeout(() => {
      event.target.complete();
    }, 1500);
  }

}
