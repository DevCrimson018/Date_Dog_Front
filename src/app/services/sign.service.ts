import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignService {

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  apiUrl = "http://localhost:3000/api/sign"

  signUp(form: any) {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.apiUrl}/signup`, form)
    )
  }

  signIn(form: any) {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.apiUrl}/signin`, form)
    )
  }

  signOut() {
    localStorage.removeItem("user_token")
    this.router.navigate(['onboarding/signin'])
  }
}
