import { Component } from '@angular/core';
// Import โมดูลสำหรับการทำ Routing ของ Angular
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'; 

@Component({
  selector: 'app-member-layout', // ชื่อ Tag HTML ที่จะถูกนำไปเรียกใช้ (แต่นี่เป็น Layout หลักเลยถูกเรียกผ่าน Route)
  
  // การใช้ Standalone Component (ฟีเจอร์ใหม่ของ Angular 14+) 
  standalone: true, 
  
  // นำเข้าเครื่องมือที่ต้องใช้ในไฟล์ HTML ของหน้านี้
  // - RouterOutlet: ใช้เป็นตัวแทนแสดงผล Component ลูก
  // - RouterLink: ใช้ทำลิงก์เปลี่ยนหน้าแบบ Single Page Application (SPA) หน้าเว็บไม่โหลดใหม่
  // - RouterLinkActive: ใช้เพิ่ม Class CSS เวลากำลังอยู่หน้านั้นๆ (ทำเมนู Active)
  imports: [RouterOutlet, RouterLink, RouterLinkActive], 
  
  templateUrl: './member-layout.html',
  styleUrl: './member-layout.scss'
})
export class MemberLayout { }