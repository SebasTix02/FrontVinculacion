import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = new Router;

  const token = localStorage.getItem('token');
  if (token === undefined || token == null) {
    router.navigate(['/login']);
    return false;
  }


  return true;
};
