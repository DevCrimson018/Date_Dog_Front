import { Routes } from '@angular/router';
import { DogsComponent } from './pages/dogs/dogs.component';
import { UsersComponent } from './pages/users/users.component';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';


export const routes: Routes = [
    {path: "", redirectTo: "dogs", pathMatch: 'full'},
    {path: "dogs", component: DogsComponent, loadChildren: () => import("./pages/dogs/dogs.module").then(m => m.DogsModule)},
    {path: "users", component:  UsersComponent, loadChildren: () => import("./pages/users/users.module").then(m => m.UsersModule)},
    {path: "onboarding", component: OnboardingComponent, loadChildren: () => import("./pages/onboarding/onboarding.module").then(m => m.OnboardingModule)}
    
];
