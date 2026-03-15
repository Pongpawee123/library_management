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
    // ดึง ID จาก URL
    const id = this.route.snapshot.paramMap.get('id');
    
    // 💡 Mock Data จำลองการดึงข้อมูลจาก Database ด้วย ID
    this.book = {
      id: id,
      title: 'Angular 18 Essentials: Zero to Hero',
      isbn: '978-616-123-456',
      author: 'ศ.ดร. สมชาย รักเรียน',
      publisher: 'RMUTT Press',
      category: 'Computing & IT',
      description: 'หนังสือเล่มนี้จะพาคุณไปทำความรู้จักกับ Angular 18 ตั้งแต่พื้นฐานจนถึงการสร้างโปรเจกต์จริง โดยเน้นการทำ Workshop และการเขียนโค้ดแบบมืออาชีพ...',
      available: 5,
      total: 10,
      status: 'Available',
      cover: '📘'
    };
  }

  // 💡 ฟังก์ชันสำหรับการกดยืมหนังสือ
  borrowBook() {
    alert(`ส่งคำขอยืมหนังสือ: ${this.book.title} เรียบร้อยแล้ว! กรุณารอเจ้าหน้าที่อนุมัติ`);
  }
}