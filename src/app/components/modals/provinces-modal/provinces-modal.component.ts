import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, Output } from '@angular/core';

@Component({
  selector: 'app-provinces-modal',
  templateUrl: './provinces-modal.component.html',
  styleUrl: './provinces-modal.component.scss'
})
export class ProvincesModalComponent {
  provinces: any 
  searchProvince: string = ""
  @Output() sendProvinces: EventEmitter<any> = new EventEmitter()


  httpClient = inject(HttpClient)

  ngOnInit(): void {

    this.getProvinces()
  }



  sendProvinceFunction(province: string) {
    this.sendProvinces.emit(province)
    console.log(province);
    
  }

  getProvinces() {
    this.httpClient.get("assets/resources/provinces.json").subscribe(res => {
      this.provinces = res
      console.log(res);
    })
  }
}
