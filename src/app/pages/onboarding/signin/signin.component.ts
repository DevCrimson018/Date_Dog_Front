import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SignService } from '../../../services/sign.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  loading: boolean = false

  incorrect: boolean = false

   

  form!: FormGroup



  constructor(
    private signService: SignService,
    private router: Router
  ) {
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {
    
  }
  

  async onSubmit() {
    try {
      this.loading = true

      await this.signService.signIn(this.form.value).then(async res => {
        localStorage.setItem("user_token", res.token)
        if(res.message) {
          this.incorrect = true
          return alert(res.message)
        }
        this.incorrect = false
        
        }).then(() => {

          this.loading = false
          if(!this.incorrect && this.loading == false) {
            this.router.navigate(['dogs'])
          }
        })
    } catch (error) {
      console.log(error);
    }
    
  }


  

}


