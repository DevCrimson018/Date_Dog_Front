import { Component, Input } from '@angular/core';

@Component({
  selector: 'dog-card',
  templateUrl: './dog-card.component.html',
  styleUrl: './dog-card.component.scss'
})
export class DogCardComponent {
  @Input() dog: any

  
}
