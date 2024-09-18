import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let clonedReq = req
  if(localStorage.getItem("user_token")){
    clonedReq = req.clone({
      setHeaders: {
        Authorization: localStorage.getItem("user_token")!
      }
    })
  }
  return next(clonedReq);
};
