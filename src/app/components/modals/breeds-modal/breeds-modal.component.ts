import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';

@Component({
  selector: 'app-breeds-modal',
  templateUrl: './breeds-modal.component.html',
  styleUrl: './breeds-modal.component.scss'
})
export class BreedsModalComponent {

  @Input() commingFrom: string = "" 
  breeds: any 
  searchBreed: string = ""
  @Output() sendBreeds: EventEmitter<any> = new EventEmitter()


  httpClient = inject(HttpClient)

  ngOnInit(): void {

    this.getBreeds()
  }



  sendBreedFunction(breed: string) {
    if(breed == "N/A") {
      breed = ""
    }
    this.sendBreeds.emit(breed)
    console.log(breed);
    
  }

  getBreeds() {
    this.httpClient.get("assets/resources/breeds.json").subscribe(res => {
      this.breeds = res
      console.log(res);
    })
  }
}
