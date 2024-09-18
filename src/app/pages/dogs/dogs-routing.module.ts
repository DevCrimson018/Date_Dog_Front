import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FollowedUsersDogsComponent } from './followed-users-dogs/followed-users-dogs.component';
import { MyDogsComponent } from './my-dogs/my-dogs.component';
import { DogDetailsComponent } from './dog-details/dog-details.component';
import { AddDogComponent } from './add-dog/add-dog.component';
import { EditDogComponent } from './edit-dog/edit-dog.component';

const routes: Routes = [
  {path: "", redirectTo: "followed_users_dogs", pathMatch: "full"},
  {path: "followed_users_dogs", component: FollowedUsersDogsComponent},
  {path: "my_dogs", component: MyDogsComponent},
  {path: "dog_details/:id", component: DogDetailsComponent},
  {path: "add_dog", component: AddDogComponent},
  {path: "edit_dog/:id", component: EditDogComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DogsRoutingModule { }
