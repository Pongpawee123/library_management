import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  // ── Form model ──────────────────────────────────────────────
  credentials = {
    email: '',
    password: '',
  };

  // ── UI state ─────────────────────────────────────────────────
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  /** Dynamically display the current year in the footer */
  readonly currentYear = new Date().getFullYear();

  constructor(private router: Router) { }

  // ── Toggle password visibility ────────────────────────────────
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  // ── Handle form submit ────────────────────────────────────────
  onSubmit(): void {
    this.errorMessage = '';

    if (!this.credentials.email || !this.credentials.password) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    this.isLoading = true;

    // TODO: Replace with real AuthService call, e.g.:
    // this.authService.login(this.credentials).subscribe({ ... })
    this.mockLogin();
  }

  // ── Mock login (replace with real service) ────────────────────
  private mockLogin(): void {
    setTimeout(() => {
      this.isLoading = false;

      // Demo credentials check
      if (
        this.credentials.email === 'admin@library.com' &&
        this.credentials.password === 'password'
      ) {
        this.router.navigate(['/admin/dashboard']);
      } else if (
        this.credentials.email === 'member@library.com' &&
        this.credentials.password === 'password'
      ) {
        this.router.navigate(['/catalog']);
      } else {
        this.errorMessage = 'Invalid email or password. Please try again.';
      }
    }, 1200);
  }
}
