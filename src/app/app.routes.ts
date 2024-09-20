import { Routes } from '@angular/router';
import { DogsComponent } from './pages/dogs/dogs.component';
import { UsersComponent } from './pages/users/users.component';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { signedGuard } from './guards/signed.guard';
import { notSignedGuard } from './guards/not-signed.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';


export const routes: Routes = [
    {path: "", redirectTo: "onboarding", pathMatch: 'full'},
    {path: "dogs", canActivate: [signedGuard], component: DogsComponent, loadChildren: () => import("./pages/dogs/dogs.module").then(m => m.DogsModule)},
    {path: "users", canActivate: [signedGuard], component:  UsersComponent, loadChildren: () => import("./pages/users/users.module").then(m => m.UsersModule)},
    {path: "onboarding", canActivate: [notSignedGuard], component: OnboardingComponent, loadChildren: () => import("./pages/onboarding/onboarding.module").then(m => m.OnboardingModule)},
    {path: "**", component: PageNotFoundComponent}
];
