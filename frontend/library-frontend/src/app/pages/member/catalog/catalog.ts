import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterLink], // 💡 คำถามสอบ: "ทำไมต้องใส่ RouterLink?" 💬 คำตอบ: "เพื่อให้สามารถกดที่การ์ดแล้วลิงก์ไปยังหน้ารายละเอียดหนังสือได้ครับ"
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss'
})
export class CatalogComponent {
  
  // 💡 รายชื่อหนังสือจำลอง (Mock Data) สำหรับแสดงหน้าคลังหนังสือ
  books = [
    { id: 1, title: 'Angular 18 Essentials', author: 'ศ.ดร. สมชาย', category: 'Computing', status: 'Available', cover: '📘' },
    { id: 2, title: 'Database Systems', author: 'อ.สายใจ', category: 'Database', status: 'Borrowed', cover: '📗' },
    { id: 3, title: 'UI/UX Design 2026', author: 'Dr. John', category: 'Design', status: 'Available', cover: '📙' },
    { id: 4, title: 'Fullstack Web Dev', author: 'ศ.ดร. สมชาย', category: 'Computing', status: 'Available', cover: '📕' }
  ];

  /* 💡 คำถามสอบ: "เรากรองข้อมูลหนังสืออย่างไร?"
     💬 คำตอบ: "ในขั้นตอนนี้เราใช้ *ngFor แสดงทั้งหมด แต่ในอนาคตจะใช้ฟังก์ชัน filter() 
     เพื่อค้นหาหนังสือตามชื่อหรือหมวดหมู่ที่ผู้ใช้เลือกครับ" 
  */
}