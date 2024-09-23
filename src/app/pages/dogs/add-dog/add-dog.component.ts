import { Component } from '@angular/core';
import { DogsService } from '../../../services/dogs.service';
import { FormControl, FormGroup } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-dog',
  templateUrl: './add-dog.component.html',
  styleUrl: './add-dog.component.scss'
})
export class AddDogComponent {
  loading: boolean = false

  imgUrl: any
  imgFile: any


  photos: any[] = []
  imgUrls: any[] = []
  imgsFiles: any[] = []


  vaccinePhotos: any[] = []
  imgUrlsVaccine: any[] = []
  imgsFilesVaccine: any[] = []


  breed: string = ""

  form!: FormGroup

  constructor(
    private dogService: DogsService,
    private storage: AngularFireStorage,
    private http: HttpClient,
    private router: Router
  ) {
    this.form = new FormGroup({
      name: new FormControl(),
      dob: new FormControl(),
      breed: new FormControl(),
      sex: new FormControl("male"),

    })
      
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadFirstImage()
  }

  async onSubmit() {

    this.loading = true

    if(this.form.value.dob >= Date.now()) {
      this.loading = false
      return alert("La fecha no puede ser hoy o mayor")
    }
    this.form.value.breed = this.breed

    const payload: any = jwtDecode(localStorage.getItem("user_token")!)
    this.form.addControl("idOwner", new FormControl(payload._id))
    this.form.addControl("photoOwner", new FormControl(payload.imgUrl))
    this.form.addControl("dateCreated", new FormControl(Date.now()))
    console.log(this.form.value);
    
    await this.dogService.addDog(this.form.value).then(async newDog => {
      await this.uploadImages(newDog._id).then(async () => {
        await this.uploadVaccinesImages(newDog._id).then(async () => {
          await this.uploadImage(newDog._id, payload._id).then(() => {
            this.loading = false
            this.router.navigate(['dogs/my_dogs'])
          })
        })
      })
    })


  }

  //Vaccines

  previewImageVaccine($event: any) {
    
    this.imgsFilesVaccine.push($event.target.files[0])
    let url = URL.createObjectURL($event.target.files[0])
    this.imgUrlsVaccine.push(url)
    console.log(this.imgsFilesVaccine);
    console.log(this.imgUrlsVaccine);
    
  }

  removeImagesVaccine() {
    this.imgUrlsVaccine = []
    this.imgsFilesVaccine = []
  }


  async uploadVaccinesImages(dogId: string) {
    
     for (let file of this.imgsFilesVaccine) {
      const code = crypto.getRandomValues(new Uint32Array(20))[0]
      await this.storage.upload(`dogs/${dogId}/vaccines/${code}/photo`,file).then(() => {
        this.storage.ref(`dogs/${dogId}/vaccines/${code}`).listAll().subscribe(async res => {
          await res.items[0].getDownloadURL().then(imgUrl => {
            let photo = {
              photoId: code,
              imgUrl: imgUrl
            }
            this.vaccinePhotos.push(photo)
          })
        })
      })
    }
  }

  //General Photos

  previewImages($event: any) {
    
    this.imgsFiles.push($event.target.files[0])
    let url = URL.createObjectURL($event.target.files[0])
    this.imgUrls.push(url)
    console.log(this.imgsFiles);
    console.log(this.imgUrls);
    
  }

  removeImages() {
    this.imgUrls = []
    this.imgsFiles = []
  }

  async uploadImages(dogId: string) {
    
    for (let file of this.imgsFiles) {
      const code = crypto.getRandomValues(new Uint32Array(20))[0]
      await this.storage.upload(`dogs/${dogId}/photos/${code}/photo`,file).then(() => {
        this.storage.ref(`dogs/${dogId}/photos/${code}`).listAll().subscribe(async res => {
          await res.items[0].getDownloadURL().then(imgUrl => {
            let photo = {
              photoId: code,
              imgUrl: imgUrl
            }
            this.photos.push(photo)
          })
        })
      })
    }
  }


  //Profile Photo

  previewImage($event: any) {
    this.imgFile = $event.target.files[0]
    this.imgUrl = URL.createObjectURL(this.imgFile)
  }

  async uploadImage(id: string, idOwner: string) {
    await this.storage.upload(`dogs/${id}/profilePhoto/profilePhoto`, this.imgFile).then(() => {
      this.storage.ref(`dogs/${id}/profilePhoto`).listAll().subscribe(async imgs => {
        await imgs.items[0].getDownloadURL().then(async imgUrl => {
          console.log(imgUrl);
          console.log(this.photos);
          console.log(this.vaccinePhotos);
          
          
          this.dogService.updateDog(id,{profilePhoto : imgUrl, photos: this.photos, vaccinePhotos: this.vaccinePhotos, idOwner: idOwner}).then(res => {
            console.log(res);
            
          })
        })
      })
    })
  }


  //Receive Breeds

  receiveBreed($event: any) {
    if($event == "") {
      console.log("Seleccione una Raza");
      alert("Seleccione una Raza")
      
    }
    this.breed = $event
  }


  loadFirstImage() {
    this.http.get("assets/images/NoProfilePhoto.png", {responseType: 'blob'}).subscribe((blob) => {
      console.log(blob);
      this.imgFile = new File([blob], 'noProfilePhoto.png', {type: blob.type})
      console.log(this.imgFile);
      
    })
  }

  

  checkForm() {
    console.log(this.form.value);
    
  }
}
