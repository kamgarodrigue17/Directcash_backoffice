import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-badge',
  templateUrl: './custom-badge.component.html',
  styleUrls: ['./custom-badge.component.css']
})
export class CustomBadgeComponent {

  @Input() title!: string;
  @Input() state!: "error" | "success" | "pending";

}
