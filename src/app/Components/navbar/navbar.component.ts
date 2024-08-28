import { Component } from '@angular/core';
import { AdminService } from 'src/app/services-v2/admin-plateforme/admin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    protected _userService: AdminService
  ) { }

  user: any;

  /**
   * Get connected user
   */
  getUser() {
    this.user = this._userService.getLocalUser().data;
  }

  ngOnInit() {
    this.getUser();
  }

}
