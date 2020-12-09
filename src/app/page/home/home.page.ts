import { Router } from '@angular/router';
import { imprimirPantalla } from './../../core/model/util';
import { LoginServiceService } from './../../service/login/login-service.service';
import { Component } from '@angular/core';
import { IUser } from 'src/app/interface/IUser';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  private user: IUser = {};
  private remember = false;
  private loginForm: FormGroup;

  constructor(private loginSer: LoginServiceService, private router: Router) {
    this.loginForm = new FormGroup({
      emailForm: new FormControl(this.user.email, Validators.compose([Validators.required, Validators.email])),
      passwordForm: new FormControl(this.user.password, Validators.required)
    })
  }

  ionViewWillEnter() {
    this.loginSer.user = this.user;
  }
  ionViewDidLeave() {
    this.user = {};
    this.remember = false;

  }

  async login() {
    if (this.remember) {
      const myObject = JSON.stringify(this.loginSer.user);
      window.localStorage.setItem('idUser', myObject);
      new imprimirPantalla('guardando sesion', myObject);
    }
    await this.loginSer.login(this.remember, this.loginForm.valid);
  }

}
