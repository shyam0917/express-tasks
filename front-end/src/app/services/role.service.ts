import { Injectable } from '@angular/core';
import { SwitchView } from '@angular/common/src/directives/ng_switch';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  public role = JSON.parse(localStorage.getItem('userDetails'))['role'];

  constructor() { }

  // function to check role of user
  getRole() {
    return this.role;
  }

}