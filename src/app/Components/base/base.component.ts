import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services-v2/admin-plateforme/admin.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent {

  constructor(
    private _router: Router,
    private _authService: AuthServiceService,
    private _userService: AdminService

  ) { }

  currentYear = new Date().getFullYear();
  user: any;

  /**
   * Get connected user
   */
  getUser() {
    this.user = this._userService.getLocalUser().data;
  }

  toggle_side_bar() {
    const body = document.getElementsByTagName("body");
    body[0].classList.toggle("toggle-sidebar");
  }

  /**
   * Handle logout function
   */
  logout() {
    this._authService.logout();
  }

  ngOnInit(): void {
    this.getUser();
  }
}
