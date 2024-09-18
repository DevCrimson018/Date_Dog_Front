import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DogsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  apiUrl = "http://localhost:3000/api/dogs"

  getDogs(query?: any) {
    if (query == undefined) {
      return firstValueFrom(
        this.httpClient.get<any>(`${this.apiUrl}`)
      )
    }else{
      return firstValueFrom(
        this.httpClient.get<any>(`${this.apiUrl}/?${query}`)
      )
    }

  }

  getDog(id: string) {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.apiUrl}/${id}`)
    )
  }

  addDog(newDog: any) {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.apiUrl}`, newDog)
    )
  }

  updateDog(id: string, update: any) {
    return firstValueFrom(
      this.httpClient.put<any>(`${this.apiUrl}/${id}`, update)
    )
  }

  deleteDog(id: string) {
    return firstValueFrom(
      this.httpClient.delete<any>(`${this.apiUrl}/${id}`)
    )
  }
  
}
