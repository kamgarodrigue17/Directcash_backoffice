import { Component } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent {

    toggle_side_bar(){
      const body = document.getElementsByTagName("body");
      body[0].classList.toggle("toggle-sidebar");
    }


}
