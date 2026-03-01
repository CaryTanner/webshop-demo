import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-snackbar',
  imports: [MatSnackBarModule, MatIconModule, MatButtonModule],
  templateUrl: './snackbar.html',
  styleUrl: './snackbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Snackbar {
  public data: { message: string; type: 'warn' | 'success' | 'error' | 'information' } =
    inject(MAT_SNACK_BAR_DATA);
  public snackbarRef = inject(MatSnackBarRef<Snackbar>);
}
