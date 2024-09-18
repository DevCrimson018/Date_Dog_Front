import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SignService } from '../../../services/sign.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
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

  async onSubmit() {
    try {
      await this.signService.signIn(this.form.value).then(res => {
        localStorage.setItem("user_token", res.token)
        this.router.navigate(['dogs'])
      })
    } catch (error) {
      console.log(error);
      
    }
  }
}
