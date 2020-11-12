import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginServiceService } from 'src/app/service/login/login-service.service';
import { IUser } from 'src/app/interface/IUser';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(private loginSer: LoginServiceService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let myObject: IUser = {};
    if (window.localStorage.getItem('idUser') != null) {
      myObject = JSON.parse(window.localStorage.getItem('idUser'));
      this.loginSer.user = myObject;
      let remember = true;
      this.loginSer.login(remember, true);
      return false;
    } else {
      return true;
    }

  }

}
