import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '@module/authentication/service/authentication-service';
import { ROUTE_PATHS } from 'src/app/app.routes';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const $isLoggedIn = authService.$isLoggedIn;
  const router = inject(Router);
  if (!$isLoggedIn()) {
    return router.createUrlTree([ROUTE_PATHS.app['login']], {
      queryParams: { redirectUrl: state.url },
    });
  }
  return true;
};
