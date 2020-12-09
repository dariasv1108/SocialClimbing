import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { imprimirPantalla } from 'src/app/core/model/util';
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

  private imageBlock = [];

  private subscrito: boolean;

  constructor(private boulderService: BoulderService, private blockServ: BlockService, private router: Router, private afAuth: AngularFireAuth ) {
  }

  ngOnInit() {
    this.boulder = this.boulderService.data
  }
  async ionViewWillEnter() {
    this.boulder = this.boulderService.data
    this.getImages();
    this.subscrito = this.isSubcribe();
  }

  async getImages() {
    this.imageBlock = []
    await this.blockServ.getAllBlockBoulder(this.boulder.id).subscribe(data => {
      data.forEach(block => {
        this.imageBlock.push(block.data())
      })
    });
  }

  isSubcribe(){
      if (this.boulder.follower.find(element => element == this.boulderService.token)) {
        return true;
      } else {
        return false;
      }
  }

  follow(){
    this.boulderService.newFollow()
    this.subscrito=true;
  }
  unFollow(){
    this.boulderService.unFollow()
    this.subscrito=false;
  }

  doRefresh(event) {
    this.getImages();
    setTimeout(() => {
      event.target.complete();
    }, 1500);
  }

  openBlock(block) {
    this.blockServ.data = {
      nameBlock: block.name,
      imageBlock: block.imageBlock,
      level: block.level
    }
    this.router.navigate(['tabs/block'])
  }

}
