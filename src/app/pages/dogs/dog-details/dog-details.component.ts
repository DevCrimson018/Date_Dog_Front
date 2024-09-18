import { Component, inject } from '@angular/core';
import { DogsService } from '../../../services/dogs.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dog-details',
  templateUrl: './dog-details.component.html',
  styleUrl: './dog-details.component.scss'
})
export class DogDetailsComponent {
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
      let id = params['id']
      await this.dogService.getDog(id).then(dog => {
        this.dog = dog
        console.log(this.dog);
        
      })
    })

  }
}
