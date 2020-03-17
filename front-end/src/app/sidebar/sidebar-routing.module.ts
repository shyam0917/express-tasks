import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { HomeComponent } from '../shared/home/home.component';

const routes: Routes = [
  {
    path: "",
    component: SidebarComponent,
    children: [{
      path: "home", component: HomeComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidebarRoutingModule { }
