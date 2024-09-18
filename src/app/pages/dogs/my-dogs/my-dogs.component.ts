import { Component } from '@angular/core';
import { DogsService } from '../../../services/dogs.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-my-dogs',
  templateUrl: './my-dogs.component.html',
  styleUrl: './my-dogs.component.scss'
})
export class MyDogsComponent {
  dogs: any[] = []

  constructor(
    private dogService: DogsService
  ) {

  }

  ngOnInit(): void {
    this.getDogs()
  }

  async getDogs() {
    const payload:any = jwtDecode(localStorage.getItem("user_token")!)
    this.dogs = await this.dogService.getDogs(`idOwner=${payload._id}`)
    console.log(this.dogs);
    
  }
}
