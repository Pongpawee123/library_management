import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private router = inject(Router);
  private toastService = inject(ToastService);
  private authService = inject(AuthService);

  readonly loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toastService.warning('กรุณากรอก Email หรือรหัสผ่านให้ถูกต้องครบถ้วน', 'Warning');
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login({ email: email!, password: password! }).subscribe({
      next: (res) => {
        if (res.success) {
          this.toastService.success('เข้าสู่ระบบสำเร็จ! กำลังเปลี่ยนหน้า...', 'Login Success');
          
          // Route based on role
          const role = this.authService.getUserRole();
          if (role === 'admin' || role === 'librarian') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/catalog']);
          }
        }
      },
      error: (err) => {
        console.error('Login error', err);
        const errorMsg = err.error?.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง';
        this.toastService.error(errorMsg, 'Login Failed');
      }
    });
  }
}
