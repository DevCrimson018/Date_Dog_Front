import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const signedGuard: CanActivateFn = (route, state) => {

  try {
    const router = inject(Router)

    if(localStorage.getItem("user_token") != undefined || localStorage.getItem("user_token") != null) {
      return true
    }else{
      router.navigate(['onboarding'])
      return false
    }
    
  } catch (error) {
    console.log(error);
    
    return false
  }
};
