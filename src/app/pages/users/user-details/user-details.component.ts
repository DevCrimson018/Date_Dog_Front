import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { FollowService } from '../../../services/follow.service';
import { DogsService } from '../../../services/dogs.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  sameUser: boolean = false
  
  show: string = "dogs"

  following: boolean = false

  user: any = {
    firstName: ""
  }
  followers: any[] = []
  followeds: any[] = []

  dogs: any[] = []


  //Injectors
  route = inject(ActivatedRoute)
  userService = inject(UsersService)
  followService = inject(FollowService)
  dogService = inject(DogsService)

  ngOnInit(): void {
    this.startPage()

  }

  async getUser(id: string) {
    
    await this.userService.getUser(id).then(user => {
      this.user = user
      this.getFolloweds(id)
      this.getFollowers(id)
      this.getDogs(id)
      console.log(this.user);
    })
    
  }

  async getFolloweds(id: string) {
    await this.followService.getFolloweds(id).then(followeds => {
      this.followeds = followeds
    })
  }

  async getFollowers(id: string) {
    await this.followService.getFollowers(id).then(followers => {
      this.followers = followers
    })
  }
  async getDogs(idOwner: string){
    await this.dogService.getDogs(`idOwner=${idOwner}`).then(dogs => {
      this.dogs = dogs
    })
  }

  checkIsFollowed(id: string) {
    this.followService.isFollowed(id).then(res => {
      if(res.length == 0){
        this.following = false
      }else {
        this.following = true
      }
    })
  }

  checkIsSameUser(id: string) {
    const payload: any = jwtDecode(localStorage.getItem("user_token")!)

    if(payload._id == id) {
      this.sameUser = true
    }else{
      this.sameUser = false
      this.checkIsFollowed(id)
    }
  }

  async followUnfollow() {
    console.log("Follow in progress");
    
    const payload: any = jwtDecode(localStorage.getItem("user_token")!)
    
    if(this.following == true) {
      console.log("Deleting Follow");
      console.log(payload._id);
      console.log(this.user._id);
      
      
      await this.followService.deleteFollow(payload._id,this.user._id)
      this.following = false
    }else{
      const followInfo = {
        followerId: payload._id,
        followerFirstName: payload.firstName,
        followerLastName: payload.lastName,
        followerImgUrl:  "adadasd",
        
        followedId: this.user._id,
        followedFirstName: this.user.firstName,
        followedLastName: this.user.lastName,
        followedImgUrl: this.user.imgUrl
      }
      await this.followService.addFollow(followInfo)
      this.following = true
    }
  }

  startPage() {
    this.route.params.subscribe(async params => {
      const id = params['id']
      await this.getUser(id)
      this.checkIsSameUser(id)
    })
  }

}
