import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { AuthGuard } from '../auth.guard';
import { RoleGuard } from '../role.guard';

import { SidebarComponent } from './sidebar.component';
import { HomeComponent } from '../shared/home/home.component';
import { HotelsComponent } from '../shared/hotels/hotels.component';

const routes: Routes = [
  {
    path: "",
    component: SidebarComponent,
     children: [
      //  {
    //   path: "home", component: HomeComponent,
    //   canActivate: [RoleGuard]
    // },
    {
      path: "myHotels", component: HotelsComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidebarRoutingModule { }
