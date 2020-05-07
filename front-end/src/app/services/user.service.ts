import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = "http://localhost:3000/user/";
  constructor(private http: HttpClient) { }

  getUserHotels(userEmail) {
    return this.http.get(this.baseUrl + `getHotels/${userEmail}`,);
  }

  getAllHotels() {
    return this.http.get(this.baseUrl + 'allHotels');
  }
}
