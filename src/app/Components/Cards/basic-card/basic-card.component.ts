import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-basic-card',
  templateUrl: './basic-card.component.html',
  styleUrls: ['./basic-card.component.css']
})
export class BasicCardComponent {
  @Input() card_title!: string;
  @Input() card_value!: string;
  @Input() card_icon_class!: string;
  @Input() card_icon_color!: string;
  @Input() isloading!: boolean;

  constructor() { }
}
