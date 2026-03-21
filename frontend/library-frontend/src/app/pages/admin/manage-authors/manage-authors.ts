import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthorService, Author } from '../../../services/author.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-manage-authors',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-authors.html',
  styleUrl: './manage-authors.scss'
})
export class ManageAuthorsComponent implements OnInit {
  
  authorsList: Author[] = [];
  authorService = inject(AuthorService);
  toastService = inject(ToastService);

  authorForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    bio: new FormControl('') // ข้อมูลประวัติไม่บังคับใส่ (Optional)
  });

  ngOnInit() {
    this.fetchAuthors();
  }

  fetchAuthors() {
    this.authorService.getAllAuthors().subscribe({
      next: (res) => { if (res.success) this.authorsList = res.data; },
      error: () => this.toastService.error('ดึงข้อมูลผิดพลาด', 'Error')
    });
  }

  deleteAuthor(id: number) {
    if(confirm('คุณต้องการลบข้อมูลผู้แต่งท่านนี้ใช่หรือไม่?')) {
      this.authorService.deleteAuthor(id).subscribe({
        next: () => {
          this.toastService.success('ลบผู้แต่งเรียบร้อย', 'Success');
          this.fetchAuthors();
        },
        error: () => this.toastService.error('เกิดข้อผิดพลาด', 'Error')
      });
    }
  }

  editAuthor(author: Author) {
    const newName = prompt('แก้ไขชื่อผู้แต่ง:', author.name);
    if (newName && newName.trim() !== '' && newName !== author.name) {
      this.authorService.updateAuthor(author.id, { name: newName, bio: author.bio }).subscribe({
        next: () => {
          this.toastService.success('อัปเดตผู้แต่งสำเร็จ', 'Success');
          this.fetchAuthors();
        },
        error: () => this.toastService.error('ปรับปรุงไม่ได้ซ้ำ', 'Error')
      });
    }
  }

  onSubmit() {
    if (this.authorForm.valid) {
      this.authorService.createAuthor({
        name: this.authorForm.value.name!,
        bio: this.authorForm.value.bio || ''
      }).subscribe({
        next: () => {
          this.toastService.success('บันทึกข้อมูลผู้แต่งเรียบร้อย!', 'Success');
          this.authorForm.reset();
          this.fetchAuthors();
        },
        error: () => this.toastService.error('เกิดข้อผิดพลาด', 'Error')
      });
    }
  }
}