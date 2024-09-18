import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DogsRoutingModule } from './dogs-routing.module';
import { DogsComponent } from './dogs.component';
import { FollowedUsersDogsComponent } from './followed-users-dogs/followed-users-dogs.component';
import { RouterOutlet } from '@angular/router';
import { ComponentsModule } from "../../components/components.module";
import { MyDogsComponent } from './my-dogs/my-dogs.component';
import { DogDetailsComponent } from './dog-details/dog-details.component';
import { AddDogComponent } from './add-dog/add-dog.component';
import { EditDogComponent } from './edit-dog/edit-dog.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DogsComponent,
    FollowedUsersDogsComponent,
    MyDogsComponent,
    DogDetailsComponent,
    AddDogComponent,
    EditDogComponent
  ],
  imports: [
    CommonModule,
    DogsRoutingModule,
    ReactiveFormsModule,
    RouterOutlet,
    ComponentsModule
]
})
export class DogsModule { }
