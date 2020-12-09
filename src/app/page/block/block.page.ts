import { Component, OnInit } from '@angular/core';
import { IBlock } from 'src/app/interface/IBlock';
import { BlockService } from 'src/app/service/block/block.service';

@Component({
  selector: 'app-block',
  templateUrl: './block.page.html',
  styleUrls: ['./block.page.scss'],
})
export class BlockPage implements OnInit {

  private block: IBlock = {};

  constructor(private servBlock: BlockService) { }
  ionViewWillEnter() {
    this.block = {}
    this.block = {
      nameBlock: this.servBlock.data.nameBlock,
      imageBlock: this.servBlock.data.imageBlock,
      level: this.servBlock.data.level,
    }
  }
  ngOnInit() {
   
  }

}
