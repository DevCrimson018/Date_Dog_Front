import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrl: './view-image.component.scss'
})
export class ViewImageComponent {
  @Input() imgUrl: string = ""

}
