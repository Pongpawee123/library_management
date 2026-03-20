import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {
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