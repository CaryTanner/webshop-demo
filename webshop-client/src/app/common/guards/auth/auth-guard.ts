import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '@module/authentication/service/authentication-service';

export const authGuard: CanActivateFn = (route, state) => {
  const $isLoggedIn = inject(AuthenticationService).isLoggedIn();
  const router = inject(Router);
  if (!$isLoggedIn()) {
    return router.createUrlTree(['/login'], {
      queryParams: { redirectUrl: state.url },
    });
  }
  return true;
};
