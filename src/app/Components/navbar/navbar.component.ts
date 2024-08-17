import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  displayedname: any = " ";
  ngOnInit(): void {
    this.displayedname = localStorage.getItem("id");
  }
}
