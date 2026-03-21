import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { BookService, Book } from '../../../services/book.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-manage-books',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './manage-books.html',
  styleUrl: './manage-books.scss'
})
export class ManageBooksComponent implements OnInit {
  
  booksList: Book[] = [];
  bookService = inject(BookService);
  toastService = inject(ToastService);

  bookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    isbn: new FormControl('', Validators.required),
    publisher: new FormControl('', Validators.required), // Actually this requires real relation maps in the backend, but we send as simple mapping
    totalCopies: new FormControl(1, [Validators.required, Validators.min(1)])
  });

  ngOnInit() {
    this.fetchBooks();
  }

  fetchBooks() {
    this.bookService.getAllBooks().subscribe({
      next: (res) => { if (res.success) this.booksList = res.data; },
      error: () => this.toastService.error('ดึงข้อมูลผิดพลาด', 'Error')
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {
      this.bookService.createBook({
        title: this.bookForm.value.title,
        isbn: this.bookForm.value.isbn,
        publisher_id: Number(this.bookForm.value.publisher) || null, // Assuming numerical mapping if supported, else text
        total_copies: this.bookForm.value.totalCopies
      }).subscribe({
        next: () => {
          this.toastService.success('บันทึกหนังสือสำเร็จ!', 'Success');
          this.bookForm.reset({ totalCopies: 1 });
          this.fetchBooks();
        },
        error: () => this.toastService.error('บันทึกหนังสือไม่สำเร็จ (เช็คข้อมูล)', 'Error')
      });
    }
  }

  deleteBook(id: number) {
    if(confirm('คุณแน่ใจใช่ไหมที่จะลบหนังสือเล่มนี้?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.toastService.success('ลบหนังสือสำเร็จ', 'Success');
          this.fetchBooks();
        },
        error: () => this.toastService.error('ล้มเหลว', 'Error')
      });
    }
  }

  editBook(book: Book) {
    const newTitle = prompt('แก้ไขชื่อหนังสือ:', book.title);
    if (newTitle === null) return;
    
    const newIsbn = prompt('แก้ไข ISBN:', book.isbn);
    if (newIsbn === null) return;

    this.bookService.updateBook(book.id, {
      title: newTitle,
      isbn: newIsbn,
      total_copies: book.total_copies, 
      available_copies: book.available_copies
    }).subscribe({
      next: () => {
        this.toastService.success('อัปเดตหนังสือสำเร็จ', 'Success');
        this.fetchBooks();
      },
      error: () => this.toastService.error('อัปเดตไม่สำเร็จ (เช็คข้อมูล)', 'Error')
    });
  }
}