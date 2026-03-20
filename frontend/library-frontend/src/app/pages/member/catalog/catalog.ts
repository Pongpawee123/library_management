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
  // ตัวอย่างข้อมูลที่ต้องแก้ใน catalog.ts
  books = [
    { 
      id: 1, // 👈 เพิ่มบรรทัดนี้เข้าไปครับ! (เปลี่ยนเลขไปเรื่อยๆ)
      title: 'Angular 18 Essentials', 
      author: 'ศ.ดร. สมชาย', 
      category: 'Computing', 
      status: 'Available', // (หรือ 'Ready' ตามที่เอิร์ธใช้)
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/3589/3589036.png' 
    },
    { 
      id: 2, // 👈 เพิ่ม id เข้าไป
      title: 'Database Systems', 
      author: 'อ.สายใจ', 
      category: 'Database', 
      status: 'Borrowed',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/2885/2885412.png'
    },
    { 
      id: 3, // 👈 เพิ่ม id เข้าไป
      title: 'UI/UX Design 2026', 
      author: 'Dr. John', 
      category: 'Design', 
      status: 'Available',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/1216/1216733.png'
    },
    { 
      id: 4, // 👈 เพิ่ม id เข้าไป
      title: 'Fullstack Web Dev', 
      author: 'ศ.ดร. สมชาย', 
      category: 'Computing', 
      status: 'Available',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/2092/2092430.png'
    }
  ];

  /* 💡 คำถามสอบ: "เรากรองข้อมูลหนังสืออย่างไร?"
     💬 คำตอบ: "ในขั้นตอนนี้เราใช้ *ngFor แสดงทั้งหมด แต่ในอนาคตจะใช้ฟังก์ชัน filter() 
     เพื่อค้นหาหนังสือตามชื่อหรือหมวดหมู่ที่ผู้ใช้เลือกครับ" 
  */
}