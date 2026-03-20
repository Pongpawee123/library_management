import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-authors',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-authors.html',
  styleUrl: './manage-authors.scss'
})
export class ManageAuthorsComponent {
  
  // 💡 ข้อมูลจำลองรายชื่อผู้แต่ง (Mock Data)
  authorsList = [
    { id: 1, name: 'ศ.ดร. สมชาย รักเรียน', bio: 'ผู้เชี่ยวชาญด้านวิทยาการคอมพิวเตอร์', bookCount: 5 },
    { id: 2, name: 'อ.สายใจ ใฝ่รู้', bio: 'นักเขียนอิสระด้านวรรณกรรมไทย', bookCount: 12 },
    { id: 3, name: 'Dr. John Smith', bio: 'International Guest Lecturer in Business', bookCount: 3 }
  ];

  // 💡 ฟอร์มสำหรับเพิ่มข้อมูลผู้แต่ง
  authorForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    bio: new FormControl('') // ข้อมูลประวัติไม่บังคับใส่ (Optional)
  });

  /* 💡 คำถามสอบ: "ทำไมถึงเลือกใช้ ID ในการลบ?"
     💬 คำตอบ: "เพราะ ID เป็น Primary Key ที่ไม่ซ้ำกัน (Unique) ทำให้มั่นใจได้ว่าเราลบข้อมูลถูกแถวแน่นอนครับ" 
  */
  deleteAuthor(id: number) {
    if(confirm('คุณต้องการลบข้อมูลผู้แต่งท่านนี้ใช่หรือไม่?')) {
      this.authorsList = this.authorsList.filter(author => author.id !== id);
    }
  }

  onSubmit() {
    if (this.authorForm.valid) {
      console.log('ส่งข้อมูลผู้แต่ง:', this.authorForm.value);
      alert('บันทึกข้อมูลผู้แต่งเรียบร้อย!');
      this.authorForm.reset();
    }
  }
}