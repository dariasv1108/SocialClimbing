import { Injectable } from '@angular/core';
import { Base64ToGallery, Base64ToGalleryOptions } from '@ionic-native/base64-to-gallery/ngx';
import { ToastController } from '@ionic/angular';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class AccessGaleryService {

  constructor(private base64ToGallery: Base64ToGallery, private toastCtrl: ToastController, private camera: Camera) { }

  b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
  exportCanvasImageCordova(dataUrl) {

    const options: Base64ToGalleryOptions = { prefix: 'canvas_', mediaScanner: true };

    this.base64ToGallery.base64ToGallery(dataUrl, options).then(
      async res => {
        const toast = await this.toastCtrl.create({
          message: 'Image saved to camera roll.',
          duration: 2000
        });
        toast.present();
      },
      err => alert('Error saving image to gallery ')
    );

  }
  exportCanvasImageOther(dataUrl) {
    // Fallback for Desktop
    var data = dataUrl.split(',')[1];
    let blob = this.b64toBlob(data, 'image/png');

    var a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'canvasimage.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  async openCamera() {
    var image = "";
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
    };
    await this.camera.getPicture(options).then((imageData) => {
      image = (<any>window).Ionic.WebView.convertFileSrc(imageData);

    }, (err) => {
      alert("error " + JSON.stringify(err));
    });
    return image;
  }
  async openGalery() {
    var image = "";
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
    };
    await this.camera.getPicture(options).then((imageData) => {
      image = (<any>window).Ionic.WebView.convertFileSrc(imageData);
    }, (err) => {
      alert("error " + JSON.stringify(err));
    });
    return image;
  }
  async profileImage(height, width) {
    var image;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit: true,
      targetHeight: height,
      targetWidth: width,
    };
    await this.camera.getPicture(options).then((imageData) => {
      image = (<any>window).Ionic.WebView.convertFileSrc(imageData);
    }, (err) => {
      alert("error " + JSON.stringify(err));
    });
    return image;
  }
}
