import { Component } from '@angular/core';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrl: './search-modal.component.scss'
})
export class SearchModalComponent {

  showUsers: boolean = true

  showUsersF () {
    this.showUsers = true
  }
  showDogs () {
    this.showUsers = false
  }
}
