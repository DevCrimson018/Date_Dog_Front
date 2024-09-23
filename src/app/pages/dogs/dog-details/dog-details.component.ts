import { Component, inject } from '@angular/core';
import { DogsService } from '../../../services/dogs.service';
import { ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-dog-details',
  templateUrl: './dog-details.component.html',
  styleUrl: './dog-details.component.scss'
})
export class DogDetailsComponent {

  viewFullImageUrl: string = ""

  isOwner: boolean = false
  loading: boolean = true

  dog: any = {
    profilePhoto: "",
    vaccinePhotos: [],
    photos: [],

  }

  route = inject(ActivatedRoute)
  dogService = inject(DogsService)

  ngOnInit(): void {
    this.getDogInfo()
  }


  async getDogInfo() {
    this.route.params.subscribe(async params => {
      this.loading = true
      let id = params['id']
      await this.dogService.getDog(id).then(dog => {
        this.dog = dog
        this.checkIfIsOwner(dog.idOwner)
        console.log(this.dog);
        this.loading = false
        
      })
    })
  }

  checkIfIsOwner(idOwner: string) {
    const payload: any = jwtDecode(localStorage.getItem("user_token")!)

    if(idOwner == payload._id) {
      this.isOwner = true
    }else {
      this.isOwner = false
    }
  }

  viewFullImage(imgUrl: string) {
    this.viewFullImageUrl = imgUrl
  }
}
