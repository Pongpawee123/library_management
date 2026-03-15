import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-publishers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-publishers.html',
  styleUrl: './manage-publishers.scss'
})
export class ManagePublishersComponent {
  
  // 💡 ข้อมูลจำลองรายชื่อสำนักพิมพ์ (Mock Data)
  publishersList = [
    { id: 1, name: 'RMUTT Press', address: 'ปทุมธานี', contact: '02-549-xxxx' },
    { id: 2, name: 'Tech Book Thailand', address: 'กรุงเทพฯ', contact: '081-xxx-xxxx' },
    { id: 3, name: 'Knowledge Center', address: 'นนทบุรี', contact: '02-123-xxxx' }
  ];

  // 💡 ฟอร์มสำหรับเพิ่มสำนักพิมพ์
  publisherForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl(''),
    contact: new FormControl('', [Validators.pattern('^[0-9-]*$')]) // ตรวจสอบให้กรอกได้เฉพาะตัวเลขและขีด
  });

  /* 💡 คำถามสอบ: "Validators.pattern มีประโยชน์อย่างไร?"
     💬 คำตอบ: "ใช้สำหรับกำหนดรูปแบบข้อมูล (Regular Expression) ที่ยอมรับครับ 
     เช่น เบอร์โทรศัพท์ต้องเป็นตัวเลขเท่านั้น เพื่อป้องกันความผิดพลาดของข้อมูล (Data Integrity) ครับ" 
  */
  deletePublisher(id: number) {
    if(confirm('ยืนยันการลบสำนักพิมพ์นี้?')) {
      this.publishersList = this.publishersList.filter(p => p.id !== id);
    }
  }

  onSubmit() {
    if (this.publisherForm.valid) {
      console.log('บันทึกสำนักพิมพ์:', this.publisherForm.value);
      alert('บันทึกข้อมูลสำนักพิมพ์สำเร็จ!');
      this.publisherForm.reset();
    }
  }
}