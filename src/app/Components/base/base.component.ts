import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent {

  constructor(
    private _router: Router,
    private _authService: AuthServiceService
  ) { }

  currentYear = new Date().getFullYear();

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

  displayedname: any = " ";
  ngOnInit(): void {
    this.displayedname = localStorage.getItem("id");
  }
}
