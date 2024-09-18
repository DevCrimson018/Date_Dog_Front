import { Component, inject } from '@angular/core';
import { DogsService } from '../../../services/dogs.service';
import { FollowService } from '../../../services/follow.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-followed-users-dogs',
  templateUrl: './followed-users-dogs.component.html',
  styleUrl: './followed-users-dogs.component.scss'
})
export class FollowedUsersDogsComponent {
  dogs: any[] = []
  counter: number = 0
  dogService = inject(DogsService)
  followService = inject(FollowService)

  ngOnInit(): void {
    this.getDogs()
  }

  async getDogs() {


    // this.dogService.getDogs().then(res => {
    //   this.dogs = res
    // }) 


    const payload:any = jwtDecode(localStorage.getItem("user_token")!)
    await this.followService.getFolloweds(payload._id).then(async followeds => {

      console.log(followeds);
      for(let followed of followeds){
        
        this.dogService.getDogs(`idOwner=${followed.followedId}`).then(dogs => {

          this.dogs.push(...dogs)

        })
      }
    })
  }
}
