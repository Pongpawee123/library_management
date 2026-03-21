import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class AdminDashboardComponent implements OnInit {
  summary: any = null;
  recentBorrows: any[] = [];
  
  isLoadingSummary = true;
  isLoadingBorrows = true;
  hasError = false;

  private adminService = inject(AdminService);
  private toastService = inject(ToastService);

  ngOnInit() {
    this.fetchDashboardData();
  }

  fetchDashboardData() {
    this.hasError = false;
    
    // Fetch Summary Cards
    this.adminService.getDashboardData().subscribe({
      next: (res) => {
        if (res.success) this.summary = res.data;
        this.isLoadingSummary = false;
      },
      error: (err) => {
        console.error('Summary Error:', err);
        this.hasError = true;
        this.isLoadingSummary = false;
      }
    });

    this.fetchBorrows();
  }

  fetchBorrows() {
    // Fetch Recent Activity Table
    this.adminService.getBorrowings().subscribe({
      next: (res) => {
        if (res.success) {
          this.recentBorrows = res.data;
        }
        this.isLoadingBorrows = false;
      },
      error: (err) => {
        console.error('Borrows Error:', err);
        this.hasError = true;
        this.isLoadingBorrows = false;
      }
    });
  }

  approve(id: number) {
    this.adminService.approveBorrow(id).subscribe({
      next: () => {
        this.toastService.success('อนุมัติสำเร็จ', 'Success');
        this.fetchBorrows();
        this.fetchDashboardData();
      },
      error: (err) => this.toastService.error('เกิดข้อผิดพลาด', 'Error')
    });
  }

  returnBook(id: number) {
    this.adminService.returnBorrow(id).subscribe({
      next: () => {
        this.toastService.success('คืนหนังสือสำเร็จ', 'Success');
        this.fetchBorrows();
        this.fetchDashboardData();
      },
      error: (err) => this.toastService.error('เกิดข้อผิดพลาด', 'Error')
    });
  }
}