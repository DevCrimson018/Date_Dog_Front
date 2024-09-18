import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { SignService } from '../../services/sign.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  locality: string = ""
  municipality: string = ""
  province: string = ""
  breed: string = ""

  @ViewChild('locality') localityInput!: ElementRef
  @ViewChild('municipality') municipalityInput!: ElementRef
  @ViewChild('province') provinceInput!: ElementRef

  user: any

  userService = inject(UsersService)
  signService = inject(SignService)


  ngOnInit(): void {
    this.getTokenPayload()
  }

  getTokenPayload(){
    this.user = jwtDecode(localStorage.getItem("user_token")!)

    
  }

  signOut() {
    this.signService.signOut()
  }


  receiveLocality($event: any) {
    this.locality = $event
    this.municipality = ""
    this.province = ""

    console.log($event);
    
  }

  receiveMunicipality($event: any) {
    this.municipality = $event
    this.locality = ""
    this.province = ""
    console.log($event);
  }

  receiveProvince($event: any) {
    this.province = $event
    this.locality = ""
     this.municipality = ""
    console.log($event);
  }

  receiveBreed($event: any) {
    this.breed = $event
    console.log($event);
  }
}
