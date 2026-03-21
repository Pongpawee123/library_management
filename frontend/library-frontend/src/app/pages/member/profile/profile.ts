import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, UserProfile } from '../../../services/user.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  profile: UserProfile | null = null;
  isLoading = true;
  hasError = false;

  private userService = inject(UserService);
  private toastService = inject(ToastService);

  ngOnInit() {
    this.fetchProfile();
  }

  fetchProfile() {
    this.userService.getMe().subscribe({
      next: (res) => {
        if (res.success) {
          this.profile = res.data;
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load profile:', err);
        this.toastService.error('ดึงข้อมูลโปรไฟล์ไม่สำเร็จ (กรุณา Login ก่อน)', 'Error');
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }
}
