import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  let token = localStorage.getItem("applicationToken")

  if(token != null){
    let clonedRequist = req.clone({
      headers : req.headers.set("token" , token)
    })

    return next (clonedRequist)
  }
  return next(req);
};
