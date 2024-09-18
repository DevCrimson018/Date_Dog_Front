import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { UsersService } from '../../../services/users.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {
  user: any = jwtDecode(localStorage.getItem("user_token")!)

  seeing: string = "photo"

  formImgUrl!:FormGroup
  formNames!: FormGroup
  formAddress!: FormGroup
  formPassword!: FormGroup
  formSocialMedia!: FormGroup


  imgUrl: string = ""
  imgFile: any

  constructor(
    private userService: UsersService,
    private storage: AngularFireStorage
  ) {
    this.formImgUrl = new FormGroup({
      imgUrl: new FormControl(),
    })
    this.formNames = new FormGroup({
      _id: new FormControl(this.user._id),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
    })
    this.formAddress = new FormGroup({
      _id: new FormControl(this.user._id),
      address: new FormControl('', Validators.required),
    })
    this.formPassword = new FormGroup({
      _id: new FormControl(this.user._id),
      oldPassword: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      repeatPassword: new FormControl('', Validators.required),
    })
    this.formSocialMedia = new FormGroup({
      _id: new FormControl(this.user._id),
      facebook: new FormControl('', Validators.required),
      instagram: new FormControl('', Validators.required),
      whatsapp: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.imgUrl = this.user.imgUrl
    this.userService.getUser(this.user._id).then(user => {
      this.user = user
    })
    
  }

  onSubmitImage() {
    this.storage.upload(`users/${this.user._id}/profilePhoto/profilePhoto`, this.imgFile)
  }

  onSubmitNames() {
    console.log(this.formNames.value)
    
    this.userService.updateUser(this.user._id, this.formNames.value).then(newToken => {
      this.updateToken(newToken.token)
    })
  }
  onSubmitAddress() {
    this.userService.updateUser(this.user._id, this.formAddress.value)
  }
  onSubmitPassword() {
    //Check the password is correct
    const password = this.formPassword.value.password
    const repeatPassword = this.formPassword.value.repeatPassword

    if(password == repeatPassword) {
      this.userService.updateUser(this.user._id, this.formPassword.value).then(res => {
        if(res.message) {
          alert( res.message)
        }else{
          alert("Done")
        }
      })
    }else{
      alert("Las Contrasenas no son iguales")
    }

    
  }

  onSubmitSocialMedia() {
    this.userService.updateUser(this.user._id, this.formSocialMedia.value)
  }





  previewImage($event: any) {
    this.imgFile = $event.target.files[0]
    this.imgUrl = URL.createObjectURL(this.imgFile)
  }

  updateToken(token: string) {
    localStorage.setItem("user_token", token)
  }
  
}
