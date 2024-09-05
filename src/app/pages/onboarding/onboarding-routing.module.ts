import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [
  {path: "", redirectTo: "signin", pathMatch: "full"},
  {path: "signin", component: SigninComponent},
  {path: "signup", component: SignupComponent},
  {path: "verify_email", component: VerifyEmailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingRoutingModule { }
