import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl = "http://localhost:3000/";
  constructor(public http: HttpClient) { }


  // on login click
  onLogin(loginInfo) {
    return this.http.post(this.baseUrl + 'user/login', loginInfo);
  }



}
