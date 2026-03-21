import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookService, Book } from '../../../services/book.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss'
})
export class CatalogComponent implements OnInit {
  books: Book[] = [];
  isLoading = true;
  hasError = false;

  private bookService = inject(BookService);
  private toastService = inject(ToastService);

  ngOnInit() {
    this.fetchBooks();
  }

  fetchBooks() {
    this.isLoading = true;
    this.hasError = false;
    this.toastService.info('กำลังอัพเดทคอลเล็กชั่นหนังสือ...', 'Loading');

    this.bookService.getAllBooks().subscribe({
      next: (response) => {
        if (response.success) {
          this.books = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching books:', error);
        this.toastService.error('เกิดข้อผิดพลาดในการดึงข้อมูล กรุณาลองใหม่', 'API Error');
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }
}