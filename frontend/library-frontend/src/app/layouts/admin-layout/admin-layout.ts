import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss'
})
export class AdminLayout { 
  
  // คำสั่งเปิด Sidebar สำหรับหน้าจอมือถือ
  openSidebar() {
    const overlay = document.getElementById('sidebarOverlay');
    const sidebar = document.querySelector('.sidebar-navy') || document.querySelector('.sidebar');
    
    if (overlay) overlay.classList.add('show');
    if (sidebar) sidebar.classList.add('show');
  }

  // คำสั่งปิด Sidebar สำหรับหน้าจอมือถือ
  closeSidebar() {
    const overlay = document.getElementById('sidebarOverlay');
    const sidebar = document.querySelector('.sidebar-navy') || document.querySelector('.sidebar');
    
    if (overlay) overlay.classList.remove('show');
    if (sidebar) sidebar.classList.remove('show');
  }

}