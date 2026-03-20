import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent {
  user = {
    fullname: '',
    email: '',
    password: '',
    phone: ''
  };

  onRegister() {
    console.log('User Registered:', this.user);
    // TODO: connect to backend API
  }
}