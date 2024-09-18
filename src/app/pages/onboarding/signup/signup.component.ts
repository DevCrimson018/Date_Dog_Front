import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SignService } from '../../../services/sign.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UsersService } from '../../../services/users.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  @ViewChild('locality') localityInput!: ElementRef
  @ViewChild('municipality') municipalityInput!: ElementRef
  @ViewChild('province') provinceInput!: ElementRef

  imgFile: any
  imgUrl: any

  form!: FormGroup

  constructor(
    private signService: SignService,
    private userService: UsersService,
    private router: Router,
    private storage: AngularFireStorage
  ) {
    this.form = new FormGroup({
      username: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      address: new FormGroup({
        locality: new FormControl(),
        municipality: new FormControl(),
        province: new FormControl()
      }),
      imgUrl: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      repeatPassword: new FormControl(),
    })
  }

  async onSubmit() {
    if(this.form.value.password == this.form.value.repeatPassword) {
      this.form.removeControl("repeatPassword")
      await this.signService.signUp(this.form.value).then(async res => {
        localStorage.setItem("user_token", res.token)
        if(this.imgFile) {
          const payload: any = jwtDecode(res.token)
          await this.uploadImage(payload._id)
        }else{
          this.router.navigate(['dogs'])
        }
      })
    }else{
      alert("no son iguales")
    }
  }


  async uploadImage(id: string) {
    await this.storage.upload(`users/${id}/profilePhoto/profilePhoto`, this.imgFile).then(() => {
      this.storage.ref(`users/${id}/profilePhoto`).listAll().subscribe(async imgs => {
        await imgs.items[0].getDownloadURL().then(async imgUrl => {
          console.log(imgUrl);
          this.userService.updateUser(id,{_id : id, imgUrl : imgUrl}).then(async res => {
            console.log(res);
            localStorage.setItem("user_token", res.token)
          }).then(() => {
            this.router.navigate(['dogs'])
          })
        })
      })
    })
  }

  previewImage($event: any) {
    console.log($event.target.files[0]);
    this.imgFile = $event.target.files[0]
    this.imgUrl = URL.createObjectURL(this.imgFile)

  }

  receiveLocality($event: any) {
    this.localityInput.nativeElement.value = $event
    console.log(this.localityInput.nativeElement.value);
    
    this.form.value.address.locality = $event
    console.log(this.form.value);
    
    
  }

  receiveMunicipality($event: any) {
    this.municipalityInput.nativeElement.value = $event
    console.log(this.municipalityInput.nativeElement.value);
    
    this.form.value.address.municipality = $event
    console.log(this.form.value);
    
  }

  receiveProvince($event: any) {
    this.provinceInput.nativeElement.value = $event
    console.log(this.provinceInput.nativeElement.value);
    
    this.form.value.address.province = $event
    console.log(this.form.value);
  }

}
