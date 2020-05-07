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
  showAll: boolean = true;
  selectedHotelData: any ={};
  RoomArr: any =[];
  constructor(private paymentService: PaymentService,
    private userService: UserService) { }

  ngOnInit() {
    this.getUserHotels();
  }

  // get hotels booked by user
  getUserHotels() {
    this.showBookings=true;
    let userID = JSON.parse(localStorage.getItem('userDetails')).userId;
    this.userService.getUserHotels(userID).subscribe(res => {
      if (res['success']) {
        this.hotelData = res['data'];
      }
    }, err => {
      console.log("err", err);
    })
  }

  // get all hotels
  getAllHotels() {
    this.userService.getAllHotels().subscribe(res => {
      console.log("resrr", res);
      if (res['success']) {
        this.showBookings=false;
        this.hotelData = res['data'];
      }
    }, err => {
      console.log("err", err);
    })
  }

  // display rooms of specific hotel
  showRooms(hotel){
    this.showAll = false;
   this.selectedHotelData = hotel;
   this.RoomArr = hotel['noOfRooms'];
  }

  sendPayment(selectedHotel,selectedRoom) {

    let userDetails = JSON.parse(localStorage.getItem('userDetails'));
    let bookingDetails = {
      hotelId: selectedHotel._id,
      roomId: selectedRoom._id,
      categoryType : selectedRoom.categoryType,
      userId :  userDetails.userId,
      roomNo : selectedRoom.availableRooms.pop()
    }

    const data = {
      purpose: 'Hotel Payment',
      amount: selectedRoom.price,
      buyer_name: userDetails.name,
      email: userDetails.email,
      phone: '9960119040',
      user_id: userDetails.userId,
      redirect_url: `http://localhost:3000/payment/callback?user_id=${userDetails.userId}`,
      webhook_url: '/webhook/',
      bookingDetails: bookingDetails
    };

    this.paymentService.addpayment(data).subscribe(res => {
      window.location.href = res.toString();
    }, err => {
      console.log("errr", err);
    })
  }

}
