import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { PublisherService, Publisher } from '../../../services/publisher.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-manage-publishers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-publishers.html',
  styleUrl: './manage-publishers.scss'
})
export class ManagePublishersComponent implements OnInit {
  
  publishersList: Publisher[] = [];
  publisherService = inject(PublisherService);
  toastService = inject(ToastService);

  publisherForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl(''),
    contact: new FormControl('', [Validators.pattern('^[0-9-]*$')]) // ตรวจสอบให้กรอกได้เฉพาะตัวเลขและขีด
  });

  ngOnInit() {
    this.fetchPublishers();
  }

  fetchPublishers() {
    this.publisherService.getAllPublishers().subscribe({
      next: (res) => { if (res.success) this.publishersList = res.data; },
      error: () => this.toastService.error('ดึงข้อมูลผิดพลาด', 'Error')
    });
  }

  deletePublisher(id: number) {
    if(confirm('ยืนยันการลบสำนักพิมพ์นี้?')) {
      this.publisherService.deletePublisher(id).subscribe({
        next: () => {
          this.toastService.success('ลบข้อมูลสำนักพิมพ์สำเร็จ', 'Success');
          this.fetchPublishers();
        },
        error: () => this.toastService.error('ลบข้อมูลล้มเหลว', 'Error')
      });
    }
  }

  editPublisher(pub: Publisher) {
    const newName = prompt('แก้ไขชื่อสำนักพิมพ์:', pub.name);
    if (newName && newName.trim() !== '' && newName !== pub.name) {
      this.publisherService.updatePublisher(pub.id, { name: newName, address: pub.address, contact: pub.contact }).subscribe({
        next: () => {
          this.toastService.success('อัปเดตข้อมูลสำนักพิมพ์เรียบร้อย', 'Success');
          this.fetchPublishers();
        },
        error: () => this.toastService.error('ปรับปรุงไม่ได้ (อาจมีชื่อซ้ำ)', 'Error')
      });
    }
  }

  onSubmit() {
    if (this.publisherForm.valid) {
      this.publisherService.createPublisher({
        name: this.publisherForm.value.name!,
        address: this.publisherForm.value.address || '',
        contact: this.publisherForm.value.contact || ''
      }).subscribe({
        next: () => {
          this.toastService.success('บันทึกข้อมูลสำนักพิมพ์สำเร็จ!', 'Success');
          this.publisherForm.reset();
          this.fetchPublishers();
        },
        error: () => this.toastService.error('เกิดข้อผิดพลาดในการบันทึก', 'Error')
      });
    }
  }
}