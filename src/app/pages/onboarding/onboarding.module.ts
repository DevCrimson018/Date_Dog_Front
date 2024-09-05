import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardingRoutingModule } from './onboarding-routing.module';
import { OnboardingComponent } from './onboarding.component';
import { SigninComponent } from './signin/signin.component';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';


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
    RouterModule
  ]
})
export class OnboardingModule { }
