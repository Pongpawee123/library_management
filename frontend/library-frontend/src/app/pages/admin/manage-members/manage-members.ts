import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-manage-members',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-members.html',
  styleUrl: './manage-members.scss'
})
export class ManageMembersComponent implements OnInit {
  members: any[] = [];
  showAddModal = false;
  isSubmitting = false;

  adminService = inject(AdminService);
  toastService = inject(ToastService);

  addMemberForm = new FormGroup({
    name:     new FormControl('', [Validators.required, Validators.minLength(2)]),
    email:    new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    phone:    new FormControl('')
  });

  ngOnInit() {
    this.fetchMembers();
  }

  fetchMembers() {
    this.adminService.getMembers().subscribe({
      next: (res) => { if (res.success) this.members = res.data; },
      error: () => this.toastService.error('ดึงข้อมูลสมาชิกล้มเหลว', 'Error')
    });
  }

  openAddModal() {
    this.addMemberForm.reset();
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  onAddMemberSubmit() {
    if (this.addMemberForm.invalid) return;
    this.isSubmitting = true;

    const val = this.addMemberForm.value;
    this.adminService.createMember({
      name:     val.name!,
      email:    val.email!,
      password: val.password!,
      phone:    val.phone || ''
    }).subscribe({
      next: () => {
        this.toastService.success(`เพิ่มสมาชิก "${val.name}" สำเร็จ!`, 'Success');
        this.closeAddModal();
        this.fetchMembers();
      },
      error: (err) => {
        this.toastService.error(err.error?.message || 'เกิดข้อผิดพลาด', 'Error');
      },
      complete: () => { this.isSubmitting = false; }
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