import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';

@Component({
  selector: 'app-municipalities-modal',
  templateUrl: './municipalities-modal.component.html',
  styleUrl: './municipalities-modal.component.scss'
})
export class MunicipalitiesModalComponent {

  @Input() commingFrom: string = " navbar"

  municipalities: any 
  searchMunicipality: string = ""
  @Output() sendMunicipality: EventEmitter<any> = new EventEmitter()


  httpClient = inject(HttpClient)

  ngOnInit(): void {

    this.getMunicipalities()
  }



  sendMunicipalityFunction(municipality: string) {
    this.sendMunicipality.emit(municipality)
    console.log(municipality);
    
  }

  getMunicipalities() {
    this.httpClient.get("assets/resources/municipalities.json").subscribe(res => {
      this.municipalities = res
      console.log(res);
      
    })
  }
}
