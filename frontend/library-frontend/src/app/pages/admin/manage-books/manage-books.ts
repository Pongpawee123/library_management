import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-books',
  standalone: true,
  // 💡 คำถามสอบ: "ทำไมต้องใส่ CommonModule และ ReactiveFormsModule?"
  // 💬 คำตอบ: "CommonModule เพื่อให้ใช้ *ngFor และ [ngClass] ได้ ส่วน ReactiveFormsModule เพื่อใช้จัดการฟอร์มเพิ่มหนังสือครับ"
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './manage-books.html', // 👈 เช็คจุดนี้: ชื่อไฟล์ HTML ต้องตรงกับที่มีอยู่จริง
  styleUrl: './manage-books.scss'     // 👈 เช็คจุดนี้: ชื่อไฟล์ SCSS ต้องตรงกับที่มีอยู่จริง
})
export class ManageBooksComponent { // 👈 เช็คจุดนี้: ชื่อคลาสต้องเป็น ManageBooksComponent เท่านั้น
  
  // 💡 ข้อมูลจำลอง (Mock Data) ล้อตามตาราง books ใน Database
  booksList = [
    { id: 1, title: 'การเขียนโปรแกรมด้วย Angular 18', isbn: '978-616-123-456', publisher: 'RMUTT Press', total: 10, available: 8, status: 'available' },
    { id: 2, title: 'เจาะลึก Database Systems', isbn: '978-616-987-654', publisher: 'Tech Book', total: 5, available: 0, status: 'out_of_stock' },
    { id: 3, title: 'การออกแบบ UI/UX เบื้องต้น', isbn: '978-616-111-222', publisher: 'Design Studio', total: 15, available: 15, status: 'available' }
  ];

  // 💡 สร้างฟอร์มสำหรับเพิ่มหนังสือ
  bookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    isbn: new FormControl('', Validators.required),
    publisher: new FormControl('', Validators.required),
    totalCopies: new FormControl(1, [Validators.required, Validators.min(1)])
  });

  // 💡 ฟังก์ชันบันทึกข้อมูล
  onSubmit() {
    if (this.bookForm.valid) {
      console.log('Form Data:', this.bookForm.value);
      alert('บันทึกสำเร็จ!');
      this.bookForm.reset({ totalCopies: 1 });
    }
  }

  // 💡 ฟังก์ชันลบหนังสือ (ใช้ตอบอาจารย์เรื่อง Event Binding)
  deleteBook(id: number) {
    if(confirm('คุณแน่ใจใช่ไหมที่จะลบหนังสือเล่มนี้?')) {
      // ใช้ Filter เพื่อสร้าง Array ใหม่ที่ไม่มี ID ที่เราสั่งลบ
      this.booksList = this.booksList.filter(book => book.id !== id);
    }
  }
}