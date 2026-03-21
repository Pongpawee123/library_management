import { Routes } from '@angular/router';

// นำเข้า Layouts (ใช้ชื่อสั้นตามที่ Error ฟ้อง)
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { MemberLayout } from './layouts/member-layout/member-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { authGuard, adminGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'catalog', pathMatch: 'full' },

  // 🌍 โลกที่ 1: ฝั่งสมาชิก (Member)
  {
    path: '',
    component: MemberLayout,
    children: [
      { path: 'catalog', loadComponent: () => import('./pages/member/catalog/catalog').then(m => m.CatalogComponent) },
      { path: 'book-detail/:id', loadComponent: () => import('./pages/member/book-detail/book-detail').then(m => m.BookDetailComponent) },
      { path: 'my-borrows', canActivate: [authGuard], loadComponent: () => import('./pages/member/my-borrows/my-borrows').then(m => m.MyBorrowsComponent) },
      { path: 'my-reservations', canActivate: [authGuard], loadComponent: () => import('./pages/member/my-reservations/my-reservations').then(m => m.MyReservationsComponent) },
      { path: 'profile', canActivate: [authGuard], loadComponent: () => import('./pages/member/profile/profile').then(m => m.Profile) }
    ]
  },

  // 🌍 โลกที่ 2: ฝั่งหลังบ้าน (Admin / Staff)
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./pages/admin/dashboard/dashboard').then(m => m.AdminDashboardComponent) },
      { path: 'books', loadComponent: () => import('./pages/admin/manage-books/manage-books').then(m => m.ManageBooksComponent) },
      { path: 'categories', loadComponent: () => import('./pages/admin/manage-categories/manage-categories').then(m => m.ManageCategoriesComponent) },
      { path: 'authors', loadComponent: () => import('./pages/admin/manage-authors/manage-authors').then(m => m.ManageAuthorsComponent) },
      { path: 'publishers', loadComponent: () => import('./pages/admin/manage-publishers/manage-publishers').then(m => m.ManagePublishersComponent) },
      { path: 'borrows', loadComponent: () => import('./pages/admin/manage-borrows/manage-borrows').then(m => m.ManageBorrowsComponent) },
      { path: 'reservations', loadComponent: () => import('./pages/admin/manage-reservations/manage-reservations').then(m => m.ManageReservationsComponent) },
      { path: 'members', loadComponent: () => import('./pages/admin/manage-members/manage-members').then(m => m.ManageMembersComponent) },
      { path: 'staff', loadComponent: () => import('./pages/admin/manage-staff/manage-staff').then(m => m.ManageStaff) }
    ]
  },

  // 🌍 โลกที่ 3: ระบบล็อกอิน (Auth)
  {
    path: 'auth',
    component: AuthLayout,
    children: [
      { path: 'login', loadComponent: () => import('./pages/auth/login/login').then(m => m.Login) },
      { path: 'register', loadComponent: () => import('./pages/auth/register/register').then(m => m.Register) }
    ]
  }
];