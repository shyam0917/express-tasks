import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarRoutingModule } from './sidebar-routing.module';
import { SidebarComponent } from './sidebar.component';
import { HomeComponent } from '../shared/home/home.component';


@NgModule({
  declarations: [SidebarComponent, HomeComponent],
  imports: [
    CommonModule,
    SidebarRoutingModule,
  ]
})
export class SidebarModule { }
