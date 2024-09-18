import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardingRoutingModule } from './onboarding-routing.module';
import { OnboardingComponent } from './onboarding.component';
import { SigninComponent } from './signin/signin.component';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from "../../components/components.module";


@NgModule({
  declarations: [
    OnboardingComponent,
    SigninComponent,
    SignupComponent,
    VerifyEmailComponent
  ],
  imports: [
    CommonModule,
    OnboardingRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    ComponentsModule
]
})
export class OnboardingModule { }
