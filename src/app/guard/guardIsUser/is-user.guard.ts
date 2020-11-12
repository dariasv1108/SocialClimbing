import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service/data/data.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { isNullOrUndefined } from 'util';
import { imprimirPantalla } from 'src/app/core/model/util';

@Injectable({
  providedIn: 'root'
})
export class IsUserGuard implements CanActivate {
  constructor(private AFauth: AuthService, private AFstore: DataService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.AFstore.isUser(this.AFauth.getUidUser()).then((auth) => {
      if (auth) {
        return false;
      } else {
        return true;
      }
    });
  }

}
