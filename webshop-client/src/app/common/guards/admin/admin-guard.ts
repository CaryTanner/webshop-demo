import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NotificationService } from '@common/services/notification/notification.service';
import { AuthenticationService } from '@module/authentication/service/authentication-service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthenticationService);
  const $isAdmin = authService.$isAdmin;
  const notificationService = inject(NotificationService);
  const router = inject(Router);
  if (!$isAdmin()) {
    notificationService.open('You do not have permission to access this page', 'warn');
    return router.createUrlTree(['/']);
  }
  return true;
};
