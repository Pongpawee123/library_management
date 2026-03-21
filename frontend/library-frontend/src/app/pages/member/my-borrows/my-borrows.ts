import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorrowService, MyBorrowRecord } from '../../../services/borrow.service';

@Component({
  selector: 'app-my-borrows',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-borrows.html',
  styleUrl: './my-borrows.scss'
})
export class MyBorrowsComponent implements OnInit {
  borrows: MyBorrowRecord[] = [];
  isLoading = true;
  hasError = false;

  private borrowService = inject(BorrowService);

  ngOnInit() {
    this.fetchMyBorrows();
  }

  fetchMyBorrows() {
    this.isLoading = true;
    this.hasError = false;
    
    this.borrowService.getMyBorrows().subscribe({
      next: (res) => {
        if (res.success) {
          this.borrows = res.data;
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }
}