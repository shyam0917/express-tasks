import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AdminService]
})

export class HomeComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  imageURL: string = "";
  addHotelForm: FormGroup;
  Hotels: any = [];
  ROLE: string = "";

  constructor(private afStorage: AngularFireStorage,
    private formBuilder: FormBuilder,
    private adminService: AdminService) {
this.ROLE = JSON.parse(localStorage.getItem('userDetails')).role;
     }

  ngOnInit() {
    this.addHotelForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: [''],
      city: [''],
      noOfRooms: ['']
    })

    // this.getHotels();
  }

  get f() { return this.addHotelForm.controls; }

  upload(event) {
    let img = event.target.files[0];
    const path = `images/${img.name}`;
    this.ref = this.afStorage.ref(path);
    this.task = this.ref.put(event.target.files[0]);
    this.task.then((uploadSnapshot) => {
      uploadSnapshot.ref.getDownloadURL().then((downloadURL) => {
        this.imageURL = downloadURL;
        console.log(this.imageURL);
      }).catch(err => {
        console.log("err", err);
      })
    })
  }

  submitt() {
    this.addHotelForm.value.image_Url = this.imageURL;
    console.log("dfg", this.addHotelForm.value);
    this.adminService.addHotel(this.addHotelForm.value).subscribe(res => {
      console.log("res", res);
    }, err => {
      console.log("err", err);
    })

  }

  getHotels() {
    this.adminService.getHotels().subscribe(res => {
      console.log("res", res);
      if (res['success'] && res['data'].length) {
        this.Hotels = res['data'];
      }
    }, err => {
      console.log("err", err);
    })
  }

  //https://firebasestorage.googleapis.com/v0/b/hotelapp-f08fa.appspot.com/o/images%2FScreenshot%20from%202019-11-21%2018-54-56.png?alt=media&token=89768f50-33a3-4a8f-9f7d-a58f865a8347


  //   <!-- The core Firebase JS SDK is always required and must be listed first -->
  // <script src="https://www.gstatic.com/firebasejs/7.11.0/firebase-app.js"></script>

  // <!-- TODO: Add SDKs for Firebase products that you want to use
  //      https://firebase.google.com/docs/web/setup#available-libraries -->
  // <script src="https://www.gstatic.com/firebasejs/7.11.0/firebase-analytics.js"></script>

  // <script>
  //   // Your web app's Firebase configuration
  //   var firebaseConfig = {
  //     apiKey: "AIzaSyAUgFkbk-ng2z9plJDyfa02ej0DZGsUnag",
  //     authDomain: "hotelapp-f08fa.firebaseapp.com",
  //     databaseURL: "https://hotelapp-f08fa.firebaseio.com",
  //     projectId: "hotelapp-f08fa",
  //     storageBucket: "hotelapp-f08fa.appspot.com",
  //     messagingSenderId: "914429794933",
  //     appId: "1:914429794933:web:29003b7820b3ef89cc363c",
  //     measurementId: "G-S31R268WWK"
  //   };
  //   // Initialize Firebase
  //   firebase.initializeApp(firebaseConfig);
  //   firebase.analytics();
  // </script>
}
