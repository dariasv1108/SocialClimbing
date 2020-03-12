import { CommonModule } from '@angular/common';
import { AccessGaleryService } from './../../service/accessGalery/access-galery.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, LoadingController, ActionSheetController, ToastController, ModalController } from '@ionic/angular';
import { UploadImagePage } from '../upload-image/upload-image.page';
declare const PROJECT: any;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {
  private objetos = [];
  private objetoAcutal = null;
  private background = new Image();
  private elementPrint = new Image();
  @ViewChild('imageCanvas', { static: false }) canvas: any;
  private ctx: CanvasRenderingContext2D;
  private canvasPosition: DOMRect;
  private canvasElement: any;
  private srcImage;

  private selectedColor = '#9e2956';
  private colors = ['#9e2956', '#c2281d', '#de722f', '#edbf4c', '#5db37e', '#459cde', '#4250ad', '#802fa3'];
  private Hands = ['normalCircle', 'leftCircle', 'rightCircle', 'startCircle', 'topCircle'];
  private Feet = ['normalSquare', 'leftSquare', 'rightSquare', 'startSquare', 'topSquare'];
  private selectedObject = 'normalCircle';
  private objectSrc = [this.Hands, this.Feet];
  private namePosition = ['Normal', 'Left', 'Right', 'Start', 'Top']

  private drawing = false;
  private lineWidth = 5;
  private image: any = '';
  private mostrar = false;
  private imgHeight;
  private imageResize = new Image();
  constructor(private plt: Platform, private galery: AccessGaleryService,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController, public loadingCtrl: LoadingController,
    public modalCrtl: ModalController) {
  }

  ionViewDidEnter() {
    this.presentActionSheet();
    this.ctx = this.canvasElement.getContext('2d');
    this.canvasPosition = this.canvasElement.getBoundingClientRect();
    this.ctx.clearRect(0, 0, this.canvasElement.width, this.plt.height() - (this.plt.height() * 0.20));
  }
  ngOnInit() {
  }
  private openCam() {
    this.galery.openCamera().then((data: string) => {
      this.ctx.clearRect(0, 0, this.canvasElement.width, this.plt.height() - (this.plt.height() * 0.20));
      this.image = data;
      this.setBackground();
      // this.options();
    });
  }
  private getGalery() {
    this.galery.openGalery().then((data: string) => {
      this.ctx.clearRect(0, 0, this.canvasElement.width, this.plt.height() - (this.plt.height() * 0.20));
      this.image = data;
      this.setBackground();
      // this.options();
    });

  }
  ngAfterViewInit() {
    // Set the Canvas Element and its size
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.width = this.plt.width();
    this.canvasElement.height = this.imgHeight;
  }
  private startDrawing(ev) {
    this.canvasElement.height = this.imgHeight;
    this.drawing = true;
    this.mostrar = false;
    const currentX = ev.touches[0].pageX - this.canvasPosition.x;
    const currentY = ev.touches[0].pageY - this.canvasPosition.y;
    for (let index = 0; index < this.objetos.length; index++) {
      const element = this.objetos[index];
      if ((element.width + element.x) > currentX && (element.x - element.width) < currentX
        && (element.width + element.y) > currentY && (element.y - element.width) < currentY) {
        this.objetoAcutal = element;
        this.paintObjects();
        break;
      }
    }
    if (this.objetoAcutal == null) {
      this.drawObject(currentX, currentY)
    }
  }
  private endDrawing() {
    this.objetoAcutal = null;
    this.drawing = false;
    this.srcImage = this.canvasElement.toDataURL();
  }
  private selectColor(color) {
    this.selectedColor = color;
  }
  private setBackground() {
    this.background.src = this.image;
    this.background.onload = () => {
      this.resizeCanvasImage(this.background)
    }
  }
  private movedHand(ev) {
    const currentX = ev.touches[0].pageX - this.canvasPosition.x;
    const currentY = ev.touches[0].pageY - this.canvasPosition.y;
    if (this.objetoAcutal != null) {
      this.objetoAcutal.x = currentX;
      this.objetoAcutal.y = currentY;
    }
    this.paintObjects()
  }
  private exportCanvasImage() {
    var dataUrl = this.canvasElement.toDataURL();
    // Clear the current canvas
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    if (this.plt.is('cordova')) {
      this.galery.exportCanvasImageCordova(dataUrl);
    } else {
      this.galery.exportCanvasImageOther(dataUrl);
    }
  }
  private clearCanvas() {
    this.objetos = [];
    this.ctx.clearRect(0, 0, this.canvasElement.width, this.plt.height() - (this.plt.height() * 0.20));
    this.mostrar = false;
    this.setBackground()
  }
  private deleteLast() {
    this.objetos.pop();
    this.paintObjects();
  }
  private drawObject(posX, posY) {
    this.objetos.push({
      x: posX,
      y: posY,
      width: this.lineWidth,
      color: this.selectedColor,
      func: this.selectedObject,
    });
    this.paintObjects();
  }
  private paintObjects() {
    this.ctx.clearRect(0, 0, this.canvasElement.width, this.plt.height() - (this.plt.height() * 0.20));
    this.ctx.drawImage(this.imageResize, 0, 0, this.canvasElement.width, this.imgHeight);
    // this.resizeCanvasImage(this.background);
    this.objetos.forEach(element => {
      PROJECT.execute('PROJECT.' + element.func, window, element.x, element.y, element.width,
        this.ctx, element.color)
      this.ctx.beginPath();
      this.ctx.stroke();

    });
  }
  private async presentActionSheet() {
    let actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image Source',
      cssClass: 'headerActionSheet',
      buttons: [
        {
          text: 'Load from Library',
          icon: 'share',
          cssClass: 'galery',
          handler: () => {
            this.getGalery()
          }
        },
        {
          text: 'Use Camera',
          icon: 'camera',
          cssClass: 'camera',

          handler: () => {
            this.openCam()
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          cssClass: 'cancelSheet'
        }
      ]
    });
    actionSheet.present();
  }
  private options() {
    this.mostrar = !this.mostrar;
    if (this.mostrar) {
      this.canvasElement.height = this.plt.height() - (this.plt.height() * 0.90);
    } else {
      this.canvasElement.height = this.imgHeight;
    }
    this.paintObjects();
  }
  private async continue() {
    const modal = await this.modalCrtl.create({
      component: UploadImagePage,
      componentProps: {
        image: this.srcImage
      }
    });

    await modal.present();
  }
  private backgroundCol(item) {
    return "url('../../../assets/icon/objectPrint/" + item + ".png')";
  }
  private selectObjetNow(item) {
    this.selectedObject = item
  }
  private settings = {
    max_width: this.plt.width(),
    max_height: this.plt.height()
  }
  private resizeCanvasImage(img) {
    var imgWidth = img.width;
    var imgHeight = img.height;
    var ratio = 1;
    var ratio1 = 1;
    var ratio2 = 1;
    ratio1 = this.settings.max_width / imgWidth;
    ratio2 = this.settings.max_height / imgHeight;
    // Use the smallest ratio that the image best fit into the maxWidth x maxHeight box. 
    if (ratio1 < ratio2) { ratio = ratio1; } else { ratio = ratio2; }
    var canvasCopy = document.createElement("canvas");
    var copyContext = canvasCopy.getContext("2d");
    var canvasCopy2 = document.createElement("canvas");
    var copyContext2 = canvasCopy2.getContext("2d"); canvasCopy.width = imgWidth; canvasCopy.height = imgHeight; copyContext.drawImage(img, 0, 0);
    // init 
    canvasCopy2.width = imgWidth; canvasCopy2.height = imgHeight;
    copyContext2.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvasCopy2.width, canvasCopy2.height);
    var rounds = 2; var roundRatio = ratio * rounds; for (var i = 1; i <= rounds; i++) {
      // tmp 
      canvasCopy.width = imgWidth * roundRatio / i;
      canvasCopy.height = imgHeight * roundRatio / i;
      copyContext.drawImage(canvasCopy2, 0, 0, canvasCopy2.width, canvasCopy2.height, 0, 0, canvasCopy.width, canvasCopy.height);
      // copy back 
      canvasCopy2.width = imgWidth * roundRatio / i;
      canvasCopy2.height = imgHeight * roundRatio / i;
      copyContext2.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvasCopy2.width, canvasCopy2.height);
    }
    // end for // copy back to canvas 
    this.canvasElement.width = imgWidth * roundRatio / rounds;
    this.canvasElement.height = imgHeight * roundRatio / rounds;
    this.imgHeight = this.canvasElement.height;
    this.imageResize.src = canvasCopy2.toDataURL();
    this.imageResize.onload = () => {
      this.ctx.drawImage(canvasCopy2, 0, 0, canvasCopy2.width, canvasCopy2.height, 0, 0, this.canvasElement.width, this.canvasElement.height);
    }
  }
}

