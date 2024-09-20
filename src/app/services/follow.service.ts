import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(
    private httpClient: HttpClient
  ) { }

  apiUrl = "https://date-dog-back.onrender.com/api/follow"
  // apiUrl = "http://localhost:3000/api/follow"

  isFollowed(idUser : string ) {
    const payload:any = jwtDecode(localStorage.getItem("user_token")!) 
    return firstValueFrom(
      this.httpClient.get<any>(`${this.apiUrl}/?followerId=${payload._id}&followedId=${idUser}`)
    ) 
  }

  getFollowers(id: string) {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.apiUrl}/?followedId=${id}`)
    )
  }
  getFolloweds(id: string) {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.apiUrl}/?followerId=${id}`)
    )
  }

  addFollow(followInfo: any) {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.apiUrl}`, followInfo)
    )
  }

  deleteFollow(followerId: string, followedId: string) {
    return firstValueFrom(
      this.httpClient.delete<any>(`${this.apiUrl}/?followedId=${followedId}&followerId=${followerId}`)
    )
  }


}
