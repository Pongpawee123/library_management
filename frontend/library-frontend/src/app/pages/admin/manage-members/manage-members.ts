import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-members',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-members.html',
  styleUrl: './manage-members.scss'
})
export class ManageMembersComponent {
  
  // 💡 ข้อมูลจำลอง (Mock Data) สมาชิกในระบบ
  members = [
    { id: 'MEM-001', name: 'สมปอง รักดี', email: 'sompong@email.com', role: 'Member', status: 'Active', joinedDate: '2026-01-15' },
    { id: 'MEM-002', name: 'มาลี สวยมาก', email: 'malee@email.com', role: 'Member', status: 'Inactive', joinedDate: '2026-02-10' },
    { id: 'ADM-001', name: 'โคดี้ กัคโป', email: 'admin@library.com', role: 'Admin', status: 'Active', joinedDate: '2025-12-01' },
    { id: 'MEM-003', name: 'จอห์น ดอย', email: 'john@email.com', role: 'Member', status: 'Active', joinedDate: '2026-03-05' }
  ];

  // 💡 ฟังก์ชันระงับ/ปลดระงับการใช้งาน
  toggleStatus(member: any) {
    member.status = member.status === 'Active' ? 'Inactive' : 'Active';
    const action = member.status === 'Active' ? 'ปลดบล็อก' : 'ระงับการใช้งาน';
    alert(`${action} สมาชิก: ${member.name} เรียบร้อยแล้ว!`);
  }

  // 💡 ฟังก์ชันลบสมาชิก
  deleteMember(id: string, name: string) {
    if (confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลของ ${name}?`)) {
      this.members = this.members.filter(m => m.id !== id);
    }
  }
}