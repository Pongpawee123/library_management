import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.scss'
})
export class BookDetailComponent implements OnInit {
  
  // 💡 ตัวแปรเก็บข้อมูลหนังสือที่เลือก
  book: any;

  // 💡 คำถามสอบ: "ActivatedRoute มีไว้ทำไม?"
  // 💬 คำตอบ: "เอาไว้ดึงค่า Parameter จาก URL ครับ เช่น /book-detail/1 เราจะดึงเลข 1 มาเพื่อไปหาข้อมูลหนังสือเล่มนั้นครับ"
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // 1. ดึง ID จาก URL แล้วแปลงเป็นตัวเลข (Number)
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    // 2. 💡 Mock Database: ฐานข้อมูลจำลองหนังสือทั้ง 4 เล่ม (ข้อมูลและรูปตรงกับหน้า Catalog)
    const mockDatabase = [
      {
        id: 1,
        title: 'Angular 18 Essentials: Zero to Hero',
        isbn: '978-616-123-456',
        author: 'ศ.ดร. สมชาย รักเรียน',
        publisher: 'RMUTT Press',
        category: 'Computing & IT',
        description: 'หนังสือเล่มนี้จะพาคุณไปทำความรู้จักกับ Angular 18 ตั้งแต่พื้นฐานจนถึงการสร้างโปรเจกต์จริง โดยเน้นการทำ Workshop และการเขียนโค้ดแบบมืออาชีพ...',
        available: 5,
        total: 10,
        status: 'Available',
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/3589/3589036.png'
      },
      {
        id: 2,
        title: 'Database Systems: Concept and Design',
        isbn: '978-616-987-654',
        author: 'อ.สายใจ ดาต้า',
        publisher: 'Tech Book Co.',
        category: 'Database',
        description: 'เจาะลึกระบบฐานข้อมูลตั้งแต่ ER-Diagram ไปจนถึงการเขียน SQL ขั้นสูง และการปรับแต่งประสิทธิภาพ (Tuning) สำหรับผู้ดูแลระบบฐานข้อมูลมืออาชีพ...',
        available: 0, // 💡 จำลองว่าถูกยืมหมดแล้ว (ปุ่มยืมจะกดไม่ได้)
        total: 8,
        status: 'Borrowed',
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/2885/2885412.png'
      },
      {
        id: 3,
        title: 'UI/UX Design 2026: User-Centered',
        isbn: '978-616-111-222',
        author: 'Dr. John Designer',
        publisher: 'Creative Print',
        category: 'Design',
        description: 'เรียนรู้หลักการออกแบบที่เน้นผู้ใช้เป็นศูนย์กลาง การใช้สี ตัวอักษร และเครื่องมืออย่าง Figma เพื่อสร้างประสบการณ์ที่ยอดเยี่ยมให้กับแอปพลิเคชันของคุณ...',
        available: 12,
        total: 15,
        status: 'Available',
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/1216/1216733.png'
      },
      {
        id: 4,
        title: 'Fullstack Web Dev: MEAN Stack',
        isbn: '978-616-333-444',
        author: 'ศ.ดร. สมชาย รักเรียน',
        publisher: 'RMUTT Press',
        category: 'Computing & IT',
        description: 'คู่มือฉบับสมบูรณ์สำหรับการพัฒนาเว็บแบบ Fullstack ตั้งแต่การทำ Frontend ด้วย Angular ไปจนถึง Backend ด้วย Node.js และ MongoDB...',
        available: 3,
        total: 5,
        status: 'Available',
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/2092/2092430.png'
      }
    ];

    // 3. 🔍 ค้นหาหนังสือจาก ID: เอา id ที่ได้จาก URL มาเทียบกับ id ใน mockDatabase
    // ถ้าหาไม่เจอ ให้คืนค่าเล่มแรก (mockDatabase[0]) เป็นค่าเริ่มต้นป้องกัน Error
    this.book = mockDatabase.find(b => b.id === id) || mockDatabase[0];
  }

  // 💡 ฟังก์ชันสำหรับการกดยืมหนังสือ
  borrowBook() {
    alert(`ส่งคำขอยืมหนังสือ: ${this.book.title} เรียบร้อยแล้ว! กรุณารอเจ้าหน้าที่อนุมัติ`);
  }
}