import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-manage-borrows',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-borrows.html',
  styleUrl: './manage-borrows.scss'
})
export class ManageBorrowsComponent implements OnInit {
  borrowRecords: any[] = [];
  adminService = inject(AdminService);
  toastService = inject(ToastService);

  ngOnInit() {
    this.fetchBorrows();
  }

  fetchBorrows() {
    this.adminService.getBorrowings().subscribe({
      next: (res) => { if (res.success) this.borrowRecords = res.data; },
      error: (err) => { this.toastService.error('ดึงข้อมูลผิดพลาด', 'Error'); }
    });
  }

  approveBorrow(record: any) {
    this.adminService.approveBorrow(record.id).subscribe({
      next: () => {
        this.toastService.success('อนุมัติการยืมเรียบร้อย!', 'Success');
        this.fetchBorrows();
      },
      error: () => this.toastService.error('เกิดข้อผิดพลาด', 'Error')
    });
  }

  returnBook(record: any) {
    this.adminService.returnBorrow(record.id).subscribe({
      next: () => {
        this.toastService.success('รับคืนหนังสือเรียบร้อย!', 'Success');
        this.fetchBorrows();
      },
      error: () => this.toastService.error('เกิดข้อผิดพลาด', 'Error')
    });
  }
}