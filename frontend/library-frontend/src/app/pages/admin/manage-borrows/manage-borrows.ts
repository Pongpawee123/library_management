import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-borrows',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-borrows.html',
  styleUrl: './manage-borrows.scss'
})
export class ManageBorrowsComponent {
  
  // 💡 ข้อมูลจำลอง (Mock Data) รายการยืม-คืน
  borrowRecords = [
    { id: 'BR-001', memberName: 'สมปอง รักดี', bookTitle: 'Angular 18 Essentials', borrowDate: '2026-03-15', dueDate: '2026-03-22', status: 'Pending' },
    { id: 'BR-002', memberName: 'มาลี สวยมาก', bookTitle: 'Database Systems', borrowDate: '2026-03-10', dueDate: '2026-03-17', status: 'Borrowed' },
    { id: 'BR-003', memberName: 'จอห์น ดอย', bookTitle: 'UI/UX Design 2026', borrowDate: '2026-03-01', dueDate: '2026-03-08', status: 'Overdue' },
    { id: 'BR-004', memberName: 'สมหญิง จริงใจ', bookTitle: 'Fullstack Web Dev', borrowDate: '2026-03-12', dueDate: '2026-03-19', status: 'Returned' }
  ];

  // 💡 ฟังก์ชันอนุมัติการยืม
  approveBorrow(record: any) {
    record.status = 'Borrowed';
    alert(`อนุมัติการยืมหนังสือให้ ${record.memberName} เรียบร้อยแล้ว!`);
  }

  // 💡 ฟังก์ชันรับคืนหนังสือ
  returnBook(record: any) {
    record.status = 'Returned';
    alert(`รับคืนหนังสือจาก ${record.memberName} เรียบร้อยแล้ว!`);
  }
}