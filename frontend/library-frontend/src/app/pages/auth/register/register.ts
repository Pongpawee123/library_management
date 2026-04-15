import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  user = {
    fullname: '',
    email: '',
    password: '',
    phone: ''
  };

  onRegister() {
    if (!this.user.fullname || !this.user.email || !this.user.password) {
      this.toastService.warning('กรุณากรอกข้อมูลให้ครบถ้วน', 'Warning');
      return;
    }

    this.authService.register({
      name: this.user.fullname,
      email: this.user.email,
      password: this.user.password
    }).subscribe({
      next: (res) => {
        if (res.success) {
          this.toastService.success('สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ', 'Registration Success');
          this.router.navigate(['/auth/login']);
        }
      },
      error: (err) => {
        console.error('Register error', err);
        const errorMsg = err.error?.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก';
        this.toastService.error(errorMsg, 'Registration Failed');
      }
    });
  }
}