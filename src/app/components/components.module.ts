import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogCardComponent } from './dog-card/dog-card.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { SearchModalComponent } from './modals/search-modal/search-modal.component';
import { LocalitiesModalComponent } from './modals/localities-modal/localities-modal.component';
import { FilterLocalitiesPipe } from "../pipes/filter-locations.pipe";
import { MunicipalitiesModalComponent } from './modals/municipalities-modal/municipalities-modal.component';
import { ProvincesModalComponent } from './modals/provinces-modal/provinces-modal.component';
import { BreedsModalComponent } from './modals/breeds-modal/breeds-modal.component';



@NgModule({
  declarations: [
    DogCardComponent,
    NavbarComponent,
    SearchModalComponent,
    LocalitiesModalComponent,
    MunicipalitiesModalComponent,
    ProvincesModalComponent,
    BreedsModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FilterLocalitiesPipe
],
  exports: [
    DogCardComponent,
    NavbarComponent,
    SearchModalComponent,
    LocalitiesModalComponent,
    MunicipalitiesModalComponent,
    ProvincesModalComponent,
    BreedsModalComponent
  ]
})
export class ComponentsModule { }
