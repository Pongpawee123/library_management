import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-manage-members',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-members.html',
  styleUrl: './manage-members.scss'
})
export class ManageMembersComponent implements OnInit {
  members: any[] = [];
  adminService = inject(AdminService);
  toastService = inject(ToastService);

  ngOnInit() {
    this.fetchMembers();
  }

  fetchMembers() {
    this.adminService.getMembers().subscribe({
      next: (res) => { if (res.success) this.members = res.data; },
      error: () => this.toastService.error('ดึงข้อมูลสมาชิกล้มเหลว', 'Error')
    });
  }

  toggleStatus(member: any) {
    this.adminService.toggleMemberStatus(member.user_id).subscribe({
      next: (res) => {
        if (res.success) {
          const action = res.data.status === 'Active' ? 'ปลดบล็อก' : 'ระงับการใช้งาน';
          this.toastService.success(`${action} สมาชิกเรียบร้อยแล้ว!`, 'Success');
          this.fetchMembers();
        }
      },
      error: () => this.toastService.error('เกิดข้อผิดพลาดในการปรับสถานะ', 'Error')
    });
  }

  deleteMember(id: string, name: string) {
    if (confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลของ ${name}?`)) {
      this.adminService.deleteMember(id).subscribe({
        next: () => {
          this.toastService.success('ลบข้อมูลสมาชิกสำเร็จ', 'Success');
          this.fetchMembers();
        },
        error: () => this.toastService.error('ล้มเหลว ลบข้อมูลไม่ได้', 'Error')
      });
    }
  }
}