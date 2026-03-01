import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { NotificationService } from '../notification/notification.service';

// https://medium.com/@aleixsuau/error-handling-angular-859d529fa53a
@Injectable({
  providedIn: 'root',
})
export class ErrorService implements ErrorHandler {
  constructor(
    private notifyService: NotificationService,
    private injector: Injector,
  ) {}

  handleError(error: HttpErrorResponse | TypeError) {
    console.log('error ', error);
    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        this.notifyService.open('No internet connection');
      } else {
        const router = this.injector.get(Router);

        if (error.status !== 403) {
          this.notifyService.open(`${error.status} - ${error.message}`, 'error');
        }

        if (error.status === 403) {
          this.notifyService.open('Unauthorized access', 'warn');
          router.navigateByUrl('/');
        }
      }
    } else {
      // Add logging to an external service here, e.g. Sentry
      console.error(
        `%c Something unexpected happened. We have been notified about this event and are trying to resolve the issue`,
        'background: tomato; color: white; font-size: 12px; padding: 8px;',
      );
      
    }
  }
}
