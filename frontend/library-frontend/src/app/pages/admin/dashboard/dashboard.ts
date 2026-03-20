import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class AdminDashboardComponent {
  // 💡 Mock Data (ข้อมูลสมมติ) 
  // สอบตอบอาจารย์: "ในขั้นตอนพัฒนาเราจะจำลองข้อมูลขึ้นมาก่อน เพื่อออกแบบ UI ให้สมบูรณ์ 
  // ก่อนจะเปลี่ยนไปดึงข้อมูลจริงจาก Backend ด้วยคำสั่ง COUNT(*) ใน SQL ครับ"
  stats = {
    totalBooks: 1250,
    totalMembers: 450,
    activeBorrows: 85,
    overdueBooks: 12
  };

  recentActivities = [
    { member: 'อาทฤต ทองไพบูลย์', book: 'Angular สำหรับมือใหม่', date: '2026-03-12', status: 'ยืมแล้ว' },
    { member: 'สมชาย รักเรียน', book: 'Database Systems', date: '2026-03-11', status: 'คืนแล้ว' },
    { member: 'ใจดี มีสุข', book: 'UX/UX Design', date: '2026-03-10', status: 'เกินกำหนด' }
  ];
}