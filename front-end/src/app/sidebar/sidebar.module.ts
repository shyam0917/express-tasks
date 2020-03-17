import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarRoutingModule } from './sidebar-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar.component';
import { HomeComponent } from '../shared/home/home.component';


@NgModule({
  declarations: [SidebarComponent, HomeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SidebarRoutingModule,
  ]
})
export class SidebarModule { }
