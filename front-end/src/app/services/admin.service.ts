import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = "http://localhost:3000/admin/";
  constructor(private http: HttpClient) { }

  addHotel(hotelData) {
    return this.http.post(this.baseUrl + 'addHotel', hotelData);
  }

  getHotels() {
    return this.http.get(this.baseUrl + 'getHotels');
  }
}
