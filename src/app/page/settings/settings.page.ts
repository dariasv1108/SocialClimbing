import { Component, OnInit, ViewChild } from '@angular/core';
import { IProfile } from 'src/app/interface/IProfile';
import { AccessGaleryService } from 'src/app/service/accessGalery/access-galery.service';
import { DataProfileServiceService } from 'src/app/service/dataProfile/data-profile-service.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  private user: IProfile = {};

  private image;

  private background = new Image();

  private bandera: boolean = false;



  constructor(private galery: AccessGaleryService, private updateProfile: DataProfileServiceService) {
    this.user = this.updateProfile.data;
  }

  @ViewChild('imageCanvasSettings', { static: false }) canvas: any;
  private ctx: CanvasRenderingContext2D;
  private canvasPosition: DOMRect;
  canvasElement;


  ionViewDidEnter() {
    this.ctx = this.canvasElement.getContext('2d');
    this.canvasPosition = this.canvasElement.getBoundingClientRect();
    this.setBackground();
  }

  ngAfterViewInit() {
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.height = this.canvasElement.width;
  }

  ngOnInit() {
  }
  imageProfile() {
    this.galery.profileImage(this.canvasElement.height, this.canvasElement.width).then((data) => {
      this.background.src = data;
      this.bandera = true
      this.ctx.drawImage(this.background, 0, 0, this.canvasElement.width, this.canvasElement.height);
    });
  }
  setBackground() {
      this.background.src = this.user.imageProfile
    this.background.onload = () => {
      this.ctx.drawImage(this.background, 0, 0, this.canvasElement.width, this.canvasElement.height);
    }

  }
  continue() {
    this.updateProfile.data = this.user;
    if (this.bandera) {
      console.log(this.canvasElement)
      this.image = this.canvasElement.toDataURL();
      console.log('this.image', this.image)
      this.updateProfile.data.imageProfile = this.image;
    }
    this.updateProfile.updateUser();
  }

}
