import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css']
})
export class ServiceCardComponent {
@Input() card_title!: string;
@Input() left_side_frais!: string;
@Input() left_side_operation!: string;
@Input() right_side_frais!: string;
@Input() right_side_operation!: string;
}
