import { Component } from '@angular/core';
import { DogsService } from '../../../services/dogs.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-my-dogs',
  templateUrl: './my-dogs.component.html',
  styleUrl: './my-dogs.component.scss'
})
export class MyDogsComponent {
  loading: boolean = true
  dogs: any[] = []

  constructor(
    private dogService: DogsService
  ) {

  }

  ngOnInit(): void {
    this.getDogs()
  }

  async getDogs() {
    this.loading = true
    const payload:any = jwtDecode(localStorage.getItem("user_token")!)
    await this.dogService.getDogs(`idOwner=${payload._id}`).then(res => {
      this.dogs = res
      this.loading = false
    })
    console.log(this.dogs);
    
  }
}
