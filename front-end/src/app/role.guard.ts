import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from './services/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate {
  public expectedRole = 'admin';

  constructor(private authService: AuthenticationService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.getRole() == this.expectedRole) {
      return true;
    } else {
      return false;
    }

  }

}
