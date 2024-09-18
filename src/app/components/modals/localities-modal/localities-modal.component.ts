import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, Output } from '@angular/core';

@Component({
  selector: 'app-localities-modal',
  templateUrl: './localities-modal.component.html',
  styleUrl: './localities-modal.component.scss'
})
export class LocalitiesModalComponent {
  localities: any 
  searchLocality: string = ""
  @Output() sendLocality: EventEmitter<any> = new EventEmitter()


  httpClient = inject(HttpClient)

  ngOnInit(): void {

    this.getLocalities()
  }



  sendLocalityFunction(locality: string) {
    this.sendLocality.emit(locality)
    console.log(locality);
    
  }

  getLocalities() {
    this.httpClient.get("assets/resources/localities.json").subscribe(res => {
      this.localities = res
      console.log(res);
      
    })
  }
}
