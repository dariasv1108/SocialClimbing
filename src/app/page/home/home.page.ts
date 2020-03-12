import { LoginServiceService } from './../../service/login/login-service.service';
import { Component } from '@angular/core';
import { IUser } from 'src/app/interface/IUser';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  private user: IUser = {};

  constructor(private loginSer: LoginServiceService) {
    this.loginSer.user=this.user;
   }

  async login() {



    await this.loginSer.login();
  }

}
