import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private httpClient: HttpClient
  ) { }

  apiUrl = "https://date-dog-back.onrender.com/api/users"
  // apiUrl = "http://localhost:3000/api/users"

  getUsers(query: any) {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.apiUrl}/?${query}`)
    )
  }
  getUser(id: string) {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.apiUrl}/${id}`)
    )
  }
  updateUser(id: string, update: any) {
    return firstValueFrom(
      this.httpClient.put<any>(`${this.apiUrl}/${id}`, update)
    )
  }

  deleteUser(id: string) {
    return firstValueFrom(
      this.httpClient.delete<any>(`${this.apiUrl}/${id}`)
    )
  }

}
