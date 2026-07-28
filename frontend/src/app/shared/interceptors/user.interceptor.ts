import { HttpInterceptorFn } from '@angular/common/http';

export const userInterceptor: HttpInterceptorFn = (req, next) => {

  const username = sessionStorage.getItem('username');

  if (!username) {
    return next(req);
  }

  const cloned = req.clone({
    setHeaders: {
      'X-User': username
    }
  });

  return next(cloned);
};