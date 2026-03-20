import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-reservations',
  standalone: true,
  imports: [CommonModule],
  // 💡 แก้ให้ตรงกับชื่อไฟล์จริงในรูปของเอิร์ธ
  templateUrl: './my-reservations.html',
  styleUrl: './my-reservations.scss'
})
export class MyReservationsComponent {
  
  myReservations = [
    { id: 'RSV-001', bookTitle: 'Clean Architecture', author: 'Robert C. Martin', reserveDate: '2026-03-18', queueNumber: 1, status: 'Ready' },
    { id: 'RSV-002', bookTitle: 'The Pragmatic Programmer', author: 'Andrew Hunt', reserveDate: '2026-03-19', queueNumber: 3, status: 'Waiting' },
    { id: 'RSV-003', bookTitle: 'Head First Design Patterns', author: 'Eric Freeman', reserveDate: '2026-03-10', queueNumber: '-', status: 'Completed' },
    { id: 'RSV-004', bookTitle: 'Introduction to Algorithms', author: 'Thomas H. Cormen', reserveDate: '2026-03-12', queueNumber: '-', status: 'Cancelled' }
  ];

  cancelReservation(res: any) {
    if(confirm(`คุณต้องการยกเลิกการจองหนังสือ "${res.bookTitle}" ใช่หรือไม่?`)) {
      res.status = 'Cancelled';
      res.queueNumber = '-';
      alert('ยกเลิกการจองเรียบร้อยแล้ว');
    }
  }
}