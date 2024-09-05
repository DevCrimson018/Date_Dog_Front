import { Component } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  showDogs: boolean = true



  showDogsFunction() {
    this.showDogs = true
  }

  showAboutMe() {
    this.showDogs = false
  }

}
