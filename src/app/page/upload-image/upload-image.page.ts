import { CreateBoulderPage } from './../create-boulder/create-boulder.page';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.page.html',
  styleUrls: ['./upload-image.page.scss'],
})

export class UploadImagePage implements OnInit {

  @Input() image;
  private background = new Image();
  private searchterm: string;

  private startAt = new Subject();
  private endAt = new Subject();
  private boulder;
  private allBoulder;
  private startobs = this.startAt.asObservable();
  private endobs = this.endAt.asObservable();


  constructor(private plt: Platform, private modalCrtl: ModalController) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // Set the Canvas Element and its size
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.width = this.plt.width();
    this.canvasElement.height = this.plt.height() - (this.plt.height() * 0.40);
  }
  ionViewDidEnter() {
    this.ctx = this.canvasElement.getContext('2d');
    this.canvasPosition = this.canvasElement.getBoundingClientRect();
    this.setBackground()
  }
  @ViewChild('imageCanvas', { static: false }) canvas: any;
  private ctx: CanvasRenderingContext2D;
  private canvasPosition: DOMRect;
  private canvasElement: any;

  private setBackground() {
    this.background.src = this.image;
    this.background.onload = () => {
      this.ctx.drawImage(this.background, 0, 0);
      // , this.canvasElement.width, this.plt.height() - (this.plt.height() * 0.20)
    }
  }
  private back() {
    this.modalCrtl.dismiss()
  }
  search($event) { 
    let q = $event.target.value;
    if (q != '') {
      this.startAt.next(q);
      this.endAt.next(q + "\uf8ff");
    }
    else {
      this.boulder = this.allBoulder;
    }
  }
  async createBoulder() {
    const modal = await this.modalCrtl.create({
      component: CreateBoulderPage,
      componentProps: {

      }
    });

    await modal.present();
  }
}
