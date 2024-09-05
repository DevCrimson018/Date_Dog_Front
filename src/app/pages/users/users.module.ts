import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { RouterOutlet } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';


@NgModule({
  declarations: [
    UsersComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    RouterOutlet
  ],
  exports: [
    UsersComponent,
    UserDetailsComponent
  ]
})
export class UsersModule { }
