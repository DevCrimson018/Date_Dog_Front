import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { DogsService } from '../../../services/dogs.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrl: './search-modal.component.scss'
})
export class SearchModalComponent {

  loading: boolean = false
  
  userMessage:string = "Ejecuta una busqueda"
  userSubMessage:string = "Si quieres obtener una busqueda general, solo oprime el boton de buscar"

  dogMessage:string = "Ejecuta una busqueda"
  dogSubMessage:string = "Si quieres obtener una busqueda general, solo oprime el boton de buscar"

  @Input() locality: string = ""
  @Input() municipality: string = ""
  @Input() province: string = ""
  @Input() breed: string = ""

  @ViewChild('address') address!: ElementRef
  @ViewChild('municipality') municipalityInput!: ElementRef


  show: string= "users"
  
  search: string = ""

  //Filtering

  female: boolean = false
  male: boolean = false

  dogs: any[] = []
  users: any[] = []

  dogService = inject(DogsService)
  userService = inject(UsersService)

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    
  }

  searchDogs() {

    let query = ""
    
    //Search
    if(this.search != "") {
      query += `name=${this.search}`  
    } 

    //Sex
    if(this.female == true && this.male == false ) {
      query += `sex=Female`
    }else if(this.male == true && this.female == false) {
      query += `sex=Male`
    }else{
      console.log("No Sex Selected");
      
    }
    
    //Breed
    if(this.breed != "") {
      query += `breed=${this.breed}`
    }

    //Address
    if(this.locality != ""){
      query += `locality=${this.locality}`
    }else if(this.municipality != ""){
      query += `municipality=${this.municipality}`
    }else if(this.province != "") {
      query += `province=${this.province}`
    }else{
      console.log("No address to Filter");
      
    }



    this.dogService.getDogs(query).then(dogs => {
      this.loading = true
      this.dogs = dogs
      if(this.dogs.length == 0){
        this.dogMessage = "No hay resultados con estos filtros"
        this.dogSubMessage = "Intenta una nueva busqueda, quizas tengas suerte en la proxima"
      }
      this.loading = false
      console.log(dogs);
      
    })

  }

  searchUsers() {

    this.loading = true
    console.log("searchin users");
    
    const query = `search=${this.search}`
    this.userService.getUsers(query).then(users => {
      this.users = users
      this.loading = false
      if(this.users.length == 0){
        this.userMessage = "No hay resultados con estos filtros"
        this.userSubMessage = "Intenta una nueva busqueda, quizas tengas suerte en la proxima"
      }

      console.log(users);
    })
  }


  
  searchFunction() {
    if(this.show == "users") {
      this.searchUsers()
    }else{
      this.searchDogs()
    }
  }


  showSex() {
    console.log(this.female);
    console.log(this.male);
    
  }



  showLocality() {
    console.log(this.locality);
    console.log(this.municipality);
    console.log(this.province);
    
  }

  clearAddress() {
    this.locality = ""
    this.municipality = ""
    this.province = ""
  }



}
