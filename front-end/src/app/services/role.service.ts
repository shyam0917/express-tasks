import { Injectable } from '@angular/core';
import { SwitchView } from '@angular/common/src/directives/ng_switch';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  public userData = JSON.parse(localStorage.getItem('userDetails'));

  constructor() { }

  // function to check role of user
  getRole() {
    if (this.userData) {
      return this.userData['role'];
    }
    return null;
  }

}