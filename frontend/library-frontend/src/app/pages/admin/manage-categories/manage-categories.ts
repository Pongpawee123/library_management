import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService, Category } from '../../../services/category.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-manage-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-categories.html',
  styleUrl: './manage-categories.scss'
})
export class ManageCategoriesComponent implements OnInit {
  
  categoriesList: Category[] = [];
  categoryService = inject(CategoryService);
  toastService = inject(ToastService);

  categoryForm = new FormGroup({
    categoryName: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => { if (res.success) this.categoriesList = res.data; },
      error: () => this.toastService.error('ดึงข้อมูลผิดพลาด', 'Error')
    });
  }

  deleteCategory(id: number) {
    if(confirm('ยืนยันการลบหมวดหมู่นี้? (หนังสือในหมวดนี้อาจจะไม่มีหมวดหมู่)')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          this.toastService.success('ลบหมวดหมู่สำเร็จ', 'Success');
          this.fetchCategories();
        },
        error: () => this.toastService.error('ล้มเหลว', 'Error')
      });
    }
  }

  editCategory(cat: Category) {
    const newName = prompt('แก้ไขชื่อหมวดหมู่:', cat.name);
    if (newName && newName.trim() !== '' && newName !== cat.name) {
      this.categoryService.updateCategory(cat.id, { name: newName }).subscribe({
        next: () => {
          this.toastService.success('อัปเดตหมวดหมู่สำเร็จ', 'Success');
          this.fetchCategories();
        },
        error: () => this.toastService.error('ระบบปฏิเสธการอัปเดต (อาจมีข้อมูลซ้ำ)', 'Error')
      });
    }
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      this.categoryService.createCategory({ name: this.categoryForm.value.categoryName! }).subscribe({
        next: () => {
          this.toastService.success('บันทึกหมวดหมู่สำเร็จ!', 'Success');
          this.categoryForm.reset();
          this.fetchCategories();
        },
        error: () => this.toastService.error('เกิดข้อผิดพลาด หรือมีหมวดหมู่นี้แล้ว', 'Error')
      });
    }
  }
}