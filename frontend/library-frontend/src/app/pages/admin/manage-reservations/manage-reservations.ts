import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-reservations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-reservations.html',
  styleUrl: './manage-reservations.scss'
})
export class ManageReservationsComponent {
  
  // 💡 ข้อมูลจำลอง (Mock Data) รายการจองหนังสือ
  reservations = [
    { id: 'RSV-101', memberName: 'สมปอง รักดี', bookTitle: 'Clean Code', reserveDate: '2026-03-18', status: 'Pending' },
    { id: 'RSV-102', memberName: 'มาลี สวยมาก', bookTitle: 'Angular 18 Essentials', reserveDate: '2026-03-19', status: 'Ready' },
    { id: 'RSV-103', memberName: 'จอห์น ดอย', bookTitle: 'UX/UI for Beginners', reserveDate: '2026-03-15', status: 'Completed' },
    { id: 'RSV-104', memberName: 'ใจดี มีสุข', bookTitle: 'Database Systems', reserveDate: '2026-03-20', status: 'Cancelled' }
  ];

  /* 💡 คำถามสอบ: "ฟังก์ชันพวกนี้ทำงานยังไง?"
     💬 คำตอบ: "ในขั้นตอนนี้เป็นการจำลองการเปลี่ยนค่า status ใน Array ครับ แต่ตอนต่อ API จริงๆ 
     ฟังก์ชันนี้จะส่ง HTTP PUT Request ไปที่ Backend เพื่ออัปเดตสถานะใน Database ครับ" 
  */

  // 💡 ฟังก์ชันแจ้งว่าหนังสือพร้อมให้มารับแล้ว
  markAsReady(res: any) {
    res.status = 'Ready';
    alert(`แจ้งเตือนไปยัง ${res.memberName} แล้วว่าหนังสือพร้อมให้มารับ!`);
  }

  // 💡 ฟังก์ชันยกเลิกการจอง
  cancelReservation(res: any) {
    if(confirm(`คุณต้องการยกเลิกการจองของ ${res.memberName} ใช่หรือไม่?`)) {
      res.status = 'Cancelled';
    }
  }

  // 💡 ฟังก์ชันเปลี่ยนสถานะเป็นมารับไปแล้ว (เสร็จสิ้น)
  completeReservation(res: any) {
    res.status = 'Completed';
    alert(`บันทึกการรับหนังสือของ ${res.memberName} เรียบร้อย!`);
  }
}