import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  baseUrl = "http://localhost:3000/payment/";
  constructor(private http: HttpClient) { }

  addpayment(paymentData) {
    return this.http.post(this.baseUrl + 'pay', paymentData);
  }

}
