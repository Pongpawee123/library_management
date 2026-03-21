import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BookService, Book } from '../../../services/book.service';
import { ToastService } from '../../../services/toast.service';
import { AuthService } from '../../../services/auth.service';
import { BorrowService } from '../../../services/borrow.service';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.scss'
})
export class BookDetailComponent implements OnInit {
  book: Book | null = null;
  isLoading = true;
  hasError = false;

  private route = inject(ActivatedRoute);
  private bookService = inject(BookService);
  private borrowService = inject(BorrowService);
  private location = inject(Location);
  private toastService = inject(ToastService);
  public authService = inject(AuthService);

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.fetchBookDetails(Number(idParam));
    } else {
      this.hasError = true;
      this.isLoading = false;
    }
  }

  fetchBookDetails(id: number) {
    this.bookService.getBookById(id).subscribe({
      next: (res) => {
        if (res.success) this.book = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.toastService.error('ดึงข้อมูลหนังสือไม่สำเร็จ', 'Error');
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  goBack() {
    this.location.back();
  }

  borrowBook() {
    if (!this.book) return;
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      this.toastService.error('กรุณาเข้าสู่ระบบก่อนยืมหนังสือ', 'Error');
      return;
    }
    
    const user = JSON.parse(userStr);
    
    this.borrowService.borrowBook(user.id, this.book.id).subscribe({
      next: (res) => {
        if (res.success) {
          this.toastService.success('ยืมหนังสือสำเร็จ! โปรดรอเจ้าหน้าที่อนุมัติ', 'Success');
          // Update local copy availability optimistically
          if (this.book) this.book.available_copies--;
        }
      },
      error: (err) => {
        const backendMessage = err.error?.message || 'ไม่สามารถยืมหนังสือได้ (อาจจะหมดหรือคุณยืมเล่มนี้อยู่แล้ว)';
        this.toastService.error(backendMessage, 'Error');
      }
    });
  }
}