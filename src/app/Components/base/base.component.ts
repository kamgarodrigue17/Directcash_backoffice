import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent {

  constructor(private _router: Router) { }

  toggle_side_bar() {
    const body = document.getElementsByTagName("body");
    body[0].classList.toggle("toggle-sidebar");
  }

  // deconnexion function
  logout() {
    localStorage.clear();
    this._router.navigateByUrl('/');
  }

}
