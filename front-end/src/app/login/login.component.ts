import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import Swal from 'sweetalert2'
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]
})

export class LoginComponent implements OnInit {

  public user = {
    email: "",
    password: ""
  }

  constructor(private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
  }

  onLogin(loginData) {
    console.log("fg", loginData.form.value);
    this.authenticationService.onLogin(loginData.form.value).subscribe(res => {
      console.log("Res", res);
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: false,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: res['msg']
      })

      if (res['data']) {
        let token = res['data'].authToken;
        let userDetails = {
          email: res['data'].email,
          name: res['data'].name,
          userId: res['data']._id,
          role: res['data'].role
        }

        localStorage.setItem('authToken', token);
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        this.router.navigate(['./sidebar']);
      }
    }, err => {
      Swal.fire('Oops...', err.error.msg, 'error')
      console.log("werr", err.error);
    })
  }

}
