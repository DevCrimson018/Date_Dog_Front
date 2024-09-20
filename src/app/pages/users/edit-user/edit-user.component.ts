import { Component, ElementRef, ViewChild } from '@angular/core';
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

  loading: boolean = false

  @ViewChild('localityEdit') localityEditInput!: ElementRef
  @ViewChild('municipalityEdit') municipalityEditInput!: ElementRef
  @ViewChild('provinceEdit') provinceEditInput!: ElementRef

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
      locality: new FormControl('', Validators.required),
      municipality: new FormControl('', Validators.required),
      province: new FormControl('', Validators.required),
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
    this.loading = true
    this.storage.upload(`users/${this.user._id}/profilePhoto/profilePhoto`, this.imgFile).then(() => {
      this.loading = false
    })
  }

  onSubmitNames() {
    this.loading = true

    
    this.userService.updateUser(this.user._id, this.formNames.value).then(newToken => {
      this.updateToken(newToken.token)
      this.loading = false
    })
  }
  onSubmitAddress() {
    this.loading = true

    let address = {
      _id : this.formAddress.value._id,
      address: {
        locality: this.formAddress.value.locality,
        municipality: this.formAddress.value.municipality,
        province: this.formAddress.value.province,
      }
    }

    this.userService.updateUser(this.user._id, address).then(async () => {
      this.loading = false
    })
  }
  onSubmitPassword() {

    this.loading = false

    //Check the password is correct
    const password = this.formPassword.value.password
    const repeatPassword = this.formPassword.value.repeatPassword

    if(password == repeatPassword) {
      this.userService.updateUser(this.user._id, this.formPassword.value).then(res => {
        this.loading = false
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
    this.loading = true
    this.userService.updateUser(this.user._id, this.formSocialMedia.value).then(() => {
      this.loading = false
    })
  }


  receiveLocality($event: any) {
    this.localityEditInput.nativeElement.value = $event
    console.log(this.localityEditInput.nativeElement.value);
    
    this.formAddress.value.locality = $event
    console.log(this.formAddress.value);
    
    
  }

  receiveMunicipality($event: any) {
    this.municipalityEditInput.nativeElement.value = $event
    console.log(this.municipalityEditInput.nativeElement.value);
    
    this.formAddress.value.municipality = $event
    console.log(this.formAddress.value);
    
  }

  receiveProvince($event: any) {
    this.provinceEditInput.nativeElement.value = $event
    console.log(this.provinceEditInput.nativeElement.value);
    
    this.formAddress.value.province = $event
    console.log(this.formAddress.value);
  }


  previewImage($event: any) {
    this.imgFile = $event.target.files[0]
    this.imgUrl = URL.createObjectURL(this.imgFile)
  }

  updateToken(token: string) {
    localStorage.setItem("user_token", token)
  }
  
}
