import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})


export class AuthenticationService {
  public userData = JSON.parse(localStorage.getItem('userDetails'));
  baseUrl = "http://localhost:3000/";

  constructor(public http: HttpClient) { }


  // on login click
  onLogin(loginInfo) {
    return this.http.post(this.baseUrl + 'user/login', loginInfo);
  }

  isLoggedIn() {
    return localStorage.getItem("authToken") != null
  }

  getRole() {
    if (this.userData) {
      return this.userData['role'];
    } else {
      return null;
    }

  }



}
