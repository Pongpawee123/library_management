import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-categories.html',
  styleUrl: './manage-categories.scss'
})
export class ManageCategoriesComponent {
  
  // 💡 Mock Data สำหรับตาราง Categories
  categoriesList = [
    { id: 1, name: 'คอมพิวเตอร์และเทคโนโลยี', bookCount: 45 },
    { id: 2, name: 'วรรณกรรมและนิยาย', bookCount: 120 },
    { id: 3, name: 'ประวัติศาสตร์', bookCount: 32 },
    { id: 4, name: 'บริหารธุรกิจ', bookCount: 18 }
  ];

  // 💡 ฟอร์มสำหรับเพิ่ม/แก้ไขหมวดหมู่
  categoryForm = new FormGroup({
    categoryName: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  /* 💡 คำถามสอบ: "ฟังก์ชัน deleteCategory ทำงานอย่างไร?"
     💬 คำตอบ: "ใช้หลักการ Event Binding เพื่อรับ ID มา แล้วใช้ฟังก์ชัน filter ของ Array 
     ในการคัดข้อมูลที่ ID ไม่ตรงกับที่ระบุออก เพื่อจำลองการลบข้อมูลครับ" 
  */
  deleteCategory(id: number) {
    if(confirm('ยืนยันการลบหมวดหมู่นี้? (หนังสือในหมวดนี้อาจจะไม่มีหมวดหมู่)')) {
      this.categoriesList = this.categoriesList.filter(cat => cat.id !== id);
    }
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      console.log('บันทึกหมวดหมู่:', this.categoryForm.value);
      alert('บันทึกหมวดหมู่สำเร็จ!');
      this.categoryForm.reset();
    }
  }
}