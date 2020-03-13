import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [RoleService]
})
export class SidebarComponent implements OnInit {
  public role: string = '';
  constructor(private roleService: RoleService) { }

  ngOnInit() {

  }

  getUserRole() {
    return this.roleService.getRole();
  }



}
