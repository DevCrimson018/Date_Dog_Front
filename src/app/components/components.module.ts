import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogCardComponent } from './dog-card/dog-card.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SearchModalComponent } from './search-modal/search-modal.component';



@NgModule({
  declarations: [
    DogCardComponent,
    NavbarComponent,
    SearchModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DogCardComponent,
    NavbarComponent,
    SearchModalComponent
  ]
})
export class ComponentsModule { }
