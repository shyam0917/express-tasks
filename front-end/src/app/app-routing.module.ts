import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './auth.guard';

import { LoginComponent } from './login/login.component';


const routes: Routes = [
  //   path: "",
  //   component: LoginComponent
  // },
  {
    path: "",
    loadChildren: "./shared/home/home.module#HomeModule",
    canActivate: [AuthGuard]
  }, {
    path: "login",
    component: LoginComponent
  }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
