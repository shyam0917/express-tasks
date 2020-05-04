import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarRoutingModule } from './sidebar-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar.component';
// import { HotelsComponent } from '../shared/hotels/hotels.component';


@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SidebarRoutingModule,
  ]
})
export class SidebarModule { }
