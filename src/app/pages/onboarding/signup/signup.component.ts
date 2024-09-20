import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignService } from '../../../services/sign.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UsersService } from '../../../services/users.service';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  
  loading: boolean = false

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
    private storage: AngularFireStorage,
    private http: HttpClient
  ) {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      address: new FormGroup({
        locality: new FormControl(''),
        municipality: new FormControl(''),
        province: new FormControl('')
      }),
      imgUrl: new FormControl(),
      email: new FormControl('', [Validators.required, Validators.email],),
      password: new FormControl('', Validators.required),
      repeatPassword: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    this.loadFirstImage()
  }

  async onSubmit() {
    this.loading = true
    const form = this.form.value
    console.log(this.form);
    
    console.log(form);
    console.log(this.form.valid);
    
    
    if(this.form.valid) {
      
      if(this.form.value.password == this.form.value.repeatPassword) {
        this.form.removeControl("repeatPassword")
        await this.signService.signUp(this.form.value).then(async res => {
          localStorage.setItem("user_token", res.token)
          const payload: any = jwtDecode(res.token)
          await this.uploadImage(payload._id).then(() => {
            this.loading = false
          })
        })
      }else{
        this.loading = false
        alert("no son iguales")
      }
    }else{
      this.loading = false
      alert("Llene Todos los Campos")
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

  loadFirstImage() {
    this.http.get("assets/images/NoProfilePhoto.png", {responseType: 'blob'}).subscribe((blob) => {
      console.log(blob);
      this.imgFile = new File([blob], 'noProfilePhoto.png', {type: blob.type})
      console.log(this.imgFile);
      
    })
  }

}
