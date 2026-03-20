import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-borrows',
  standalone: true,
  imports: [CommonModule],
  // 💡 แก้ให้ตรงกับชื่อไฟล์จริงในรูปของเอิร์ธ
  templateUrl: './my-borrows.html',
  styleUrl: './my-borrows.scss'
})
export class MyBorrowsComponent {
  
  myBorrowHistory = [
    { id: 'BR-001', bookTitle: 'Angular 18 Essentials', author: 'John Doe', borrowDate: '2026-03-15', dueDate: '2026-03-22', status: 'Borrowed' },
    { id: 'BR-002', bookTitle: 'Clean Code: A Handbook', author: 'Robert C. Martin', borrowDate: '2026-02-20', dueDate: '2026-02-27', status: 'Returned' },
    { id: 'BR-003', bookTitle: 'UX/UI Design for Beginners', author: 'Jane Smith', borrowDate: '2026-03-18', dueDate: '2026-03-25', status: 'Pending' },
    { id: 'BR-004', bookTitle: 'Database Systems', author: 'Somchai Dev', borrowDate: '2026-03-01', dueDate: '2026-03-08', status: 'Overdue' }
  ];

  renewBook(record: any) {
    alert(`ส่งคำขอต่อเวลาการยืมหนังสือ "${record.bookTitle}" ไปยังแอดมินแล้ว!`);
  }
}