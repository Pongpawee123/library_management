// src/app/models/library.model.ts

export interface User {
  id?: number;
  email: string;
  role: 'admin' | 'librarian' | 'staff' | 'member';
}

export interface Book {
  id?: number;
  title: string;
  isbn: string;
  publisher_id: number;
  total_copies: number;
  available_copies: number;
}

export interface Author {
  id?: number;
  name: string;
  bio?: string;
}

export interface Category {
  id?: number;
  name: string;
}

export interface Publisher {
  id?: number;
  name: string;
  contact_email?: string;
}

export interface Member {
  id?: number;
  user_id: number;
  full_name: string;
  phone?: string;
  status: 'active' | 'suspended';
}

export interface BorrowRecord {
  id?: number;
  member_id: number;
  book_id: number;
  borrowed_at?: string;
  due_date: string;
  returned_at?: string;
  fine_amount?: number;
  extended?: boolean;
  status: 'borrowed' | 'returned' | 'overdue';
}

export interface Reservation {
  id?: number;
  member_id: number;
  book_id: number;
  reserved_at?: string;
  status: 'pending' | 'fulfilled' | 'cancelled';
}