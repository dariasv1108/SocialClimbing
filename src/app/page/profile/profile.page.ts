import { LoginServiceService } from './../../service/login/login-service.service';
import { IProfile } from 'src/app/interface/IProfile';
import { DataProfileServiceService } from 'src/app/service/dataProfile/data-profile-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private image = '';
  private user: IProfile = {};

  constructor(private profileSer: DataProfileServiceService, private afth: LoginServiceService) {
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getImage();
    this.getUser();
  }
  async getImage() {
    this.image = await this.profileSer.getImageProfile();
  }
  async getUser() {
    this.user = await this.profileSer.getUser();
    console.log(this.profileSer.data.userNick)
  }
  async logout() {
    await this.afth.logOut();
  }
}
