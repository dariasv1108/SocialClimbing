import { SignUpServiceService } from './../../service/signUp/sign-up-service.service';
import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interface/IUser';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.page.html',
  styleUrls: ['./sing-up.page.scss'],
})
export class SingUpPage implements OnInit {

  private user: IUser = {};

  constructor(private signUpSer: SignUpServiceService) {
    this.signUpSer.user = this.user;
  }

  ngOnInit() {
  }

  register() {
    this.signUpSer.register();
  }

}
