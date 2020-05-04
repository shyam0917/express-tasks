import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
  hotelData: any = [];
  showBookings: boolean = true; 

  constructor(private paymentService: PaymentService,
    private userService: UserService) { }

  ngOnInit() {
    // this.getUserHotels();
  }

  // get hotels booked by user
  getUserHotels() {
    this.showBookings=true;
    let userEmail = JSON.parse(localStorage.getItem('userDetails')).email;
    this.userService.getUserHotels(userEmail).subscribe(res => {
      if (res['success']) {
        this.hotelData = res['data'];
      }
    }, err => {
      console.log("err", err);
    })
  }

  // get all hotels
  getAllHotels() {
    this.showBookings=false;
    this.userService.getAllHotels().subscribe(res => {
      console.log("resrr", res);
      if (res['success']) {
        this.hotelData = res['data'];
      }
    }, err => {
      console.log("err", err);
    })
  }

  sendPayment() {
    let userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const data = {
      purpose: 'Bid Payment',
      amount: '10',
      buyer_name: userDetails.name,
      email: userDetails.email,
      phone: '9960119040',
      user_id: userDetails.userId,
      redirect_url: `http://localhost:3000/payment/callback?user_id=${userDetails.userId}`,
      webhook_url: '/webhook/',
    };

    this.paymentService.addpayment(data).subscribe(res => {
      window.location.href = res.toString();
    }, err => {
      console.log("errr", err);
    })
  }

}
