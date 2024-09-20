import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  {path: "", redirectTo: "edit_user", pathMatch: "full"},
  {path: "user_details/:id", component: UserDetailsComponent},
  {path: "edit_user", component: EditUserComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
