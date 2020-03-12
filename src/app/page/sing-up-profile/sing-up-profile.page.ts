import { IProfile } from './../../interface/IProfile';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AccessGaleryService } from 'src/app/service/accessGalery/access-galery.service';
import { DataProfileServiceService } from 'src/app/service/dataProfile/data-profile-service.service';

@Component({
  selector: 'app-sing-up-profile',
  templateUrl: './sing-up-profile.page.html',
  styleUrls: ['./sing-up-profile.page.scss'],
})
export class SingUpProfilePage implements OnInit {

  private user: IProfile = {};

  private image;

  private background = new Image();

  

  constructor(private galery: AccessGaleryService, private singProfile: DataProfileServiceService) {
    this.singProfile.data = this.user;

  }

  @ViewChild('imageCanvas', { static: false }) canvas: any;
  private ctx: CanvasRenderingContext2D;
  private canvasPosition: DOMRect;
  canvasElement: any;


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
      this.ctx.drawImage(this.background, 0, 0, this.canvasElement.width, this.canvasElement.height);
    });
  }
  setBackground() {
    this.background.src = '../../../assets/icon/newProfile.png';
    this.background.onload = () => {
      this.ctx.drawImage(this.background, 0, 0, this.canvasElement.width, this.canvasElement.height);
    }
   
  }
  continue() {
    this.image = this.canvasElement.toDataURL();
    this.singProfile.data.imageProfile = this.image;
    this.singProfile.addUser();
  }

}
