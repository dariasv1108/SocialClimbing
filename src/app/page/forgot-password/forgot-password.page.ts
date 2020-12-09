import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { imprimirPantalla } from 'src/app/core/model/util';
import { LoginServiceService } from 'src/app/service/login/login-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  
  private email: string = "";
  private forgotPassword: FormGroup;

  constructor(private servForgot: LoginServiceService) {
    this.forgotPassword = new FormGroup({
      emailForm: new FormControl(this.email, Validators.compose([Validators.required, Validators.email])),
    })
  }

  ngOnInit() {
  }
  async resetPassword() {
    await this.servForgot.forgotPassword(this.email);
    this.forgotPassword.reset();
  }
}
