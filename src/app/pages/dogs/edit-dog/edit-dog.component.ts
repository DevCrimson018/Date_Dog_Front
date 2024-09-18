import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { DogsService } from '../../../services/dogs.service';
import { UsersService } from '../../../services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-dog',
  templateUrl: './edit-dog.component.html',
  styleUrl: './edit-dog.component.scss'
})
export class EditDogComponent {

  editingPhotos: boolean = false
  previewProfileUrl: string = ""

  id = this.route.snapshot.paramMap.get("id")!
  sex: string = ""
  dog: any = {
    name: ""
  }




  form!: FormGroup

  constructor(
    private dogService: DogsService,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,
  ) {
    this.form = new FormGroup({
      name: new FormControl(),
      breed: new FormControl(),
      sex: new FormControl(),

    })
    
  }

  ngOnInit(): void {
    
    this.dogService.getDog(this.id).then(res => {
      this.dog = res
      this.previewProfileUrl = this.dog.profilePhoto
      console.log(this.dog);
      
      this.form.value.name = this.dog.name
    })
  }

  async onSubmit() {
    const payload: any = jwtDecode(localStorage.getItem("user_token")!)

    console.log(this.form.value);
    
    await this.dogService.updateDog(this.id, this.dog).then(async res => {
      console.log(res);
      
    })


  }

  //Vaccines

  removeImageVaccine(vaccine: any) {
    this.storage.ref(`dogs/${this.dog._id}/vaccines/${vaccine.photoId}`).listAll().subscribe(res => {
      console.log(res.items[0]);
      res.items[0].delete().then(async () => {
        this.dog.vaccinePhotos = this.dog.vaccinePhotos.filter((vaccineB: any) => vaccineB.photoId !== vaccine.photoId )
        
         this.dogService.updateDog(this.dog._id, this.dog)
      })
      
    })
    // console.log(vaccine);
    // console.log(this.dog.vaccinePhotos.filter((vaccineB: any) => vaccineB.photoId !== vaccine.photoId ));
    
  }


  async uploadVaccineImage($event: any) {
    
      const file = $event.target.files[0]     
      const code = crypto.getRandomValues(new Uint32Array(20))[0]
      await this.storage.upload(`dogs/${this.dog._id}/vaccines/${code}/photo`,file).then(() => {
        this.storage.ref(`dogs/${this.dog._id}/vaccines/${code}`).listAll().subscribe(async res => {
          await res.items[0].getDownloadURL().then(async imgUrl => {
            let photo = {
              photoId: code,
              imgUrl: imgUrl
            }
            await this.dog.vaccinePhotos.push(photo)

            console.log(this.dog.vaccinePhotos);
            
            await this.dogService.updateDog(this.dog._id, this.dog).then(res => {
              console.log(res);
              
            })
          })
        })
      })
    
  }

  //General Photos


  removeImage(photo: any) {
    this.storage.ref(`dogs/${this.dog._id}/photos/${photo.photoId}`).listAll().subscribe(res => {
      console.log(res.items[0]);
      res.items[0].delete().then(async () => {
        this.dog.photos = this.dog.photos.filter((photoB: any) => photoB.photoId !== photo.photoId )
        
         this.dogService.updateDog(this.dog._id, this.dog)
      })
      
    })
  }

  async uploadImage($event: any) {
    
      const file = $event.target.files[0]
      const code = crypto.getRandomValues(new Uint32Array(20))[0]
      await this.storage.upload(`dogs/${this.dog._id}/photos/${code}/photo`,file).then(() => {
        this.storage.ref(`dogs/${this.dog._id}/photos/${code}`).listAll().subscribe(async res => {
          await res.items[0].getDownloadURL().then(imgUrl => {
            let photo = {
              photoId: code,
              imgUrl: imgUrl
            }
            this.dog.photos.push(photo)
            this.dogService.updateDog(this.dog._id, this.dog)
          })
        })
      })
    
  }


  //Profile Photo


  async uploadProfileImage($event: any) {
    await this.storage.upload(`dogs/${this.dog._id}/profilePhoto/profilePhoto`, $event.target.files[0]).then(res => {
      this.previewProfileUrl = URL.createObjectURL($event.target.files[0])
    })

  }


  receiveBreed($event: any) {
    if($event == "") {
      console.log("Seleccione una Raza");
      alert("Seleccione una Raza")
      
    }
    this.dog.breed = $event
  }

  editPhotos() {
    this.editingPhotos = true
  }
  notEditPhotos() {
    this.editingPhotos = false
  }

}
