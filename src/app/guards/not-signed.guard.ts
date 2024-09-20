import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const notSignedGuard: CanActivateFn = (route, state) => {

  try {
    const router = inject(Router)

    if(localStorage.getItem("user_token") == null || localStorage.getItem("user_token") == undefined) {
      return true
    }else{

      router.navigate(['dogs'])
      return false
    }
  } catch (error) {
    
    return false
  }
};
