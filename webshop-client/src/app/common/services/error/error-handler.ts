import { ErrorHandler, Injector, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { NotificationService } from '../notification/notification.service';

// https://medium.com/@aleixsuau/error-handling-angular-859d529fa53a
export class CustomErrorHandler implements ErrorHandler {
  private injector = inject(Injector);

  handleError(error: HttpErrorResponse | TypeError) {
    const notificationService = this.injector.get(NotificationService);
    // eslint-disable-next-line no-console
    console.log('error ', error);
    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        notificationService.open('No internet connection');
      } else {
        const router = this.injector.get(Router);

        if (error.status !== 403) {
          notificationService.open(`${error.status} - ${error.error?.title}`, 'error');
        }

        if (error.status === 403) {
          notificationService.open('Unauthorized access', 'warn');
          router.navigateByUrl('/');
        }
      }
    } else {
      // Add logging to an external service here, e.g. Sentry
      // eslint-disable-next-line no-console
      console.error(
        `%c Something unexpected happened. We have been notified about this event and are trying to resolve the issue`,
        'background: tomato; color: white; font-size: 12px; padding: 8px;',
      );
    }
  }
}
