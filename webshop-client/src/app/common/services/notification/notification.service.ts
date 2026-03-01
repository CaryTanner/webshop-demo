import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Snackbar } from '@common/components/snackbar/snackbar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private matSnackBar = inject(MatSnackBar);

  open(message: string, type: 'success' | 'warn' | 'error' | 'info' = 'success') {
    this.matSnackBar.openFromComponent(Snackbar, {
      duration: 6_000,
      data: {
        message,
        type,
      },
    });
  }
}
