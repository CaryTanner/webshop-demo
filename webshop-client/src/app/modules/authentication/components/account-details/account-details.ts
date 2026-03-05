import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthenticationService } from '@module/authentication/service/authentication-service';

@Component({
  selector: 'app-account-details',
  imports: [],
  templateUrl: './account-details.html',
  styleUrl: './account-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountDetails {
  private authService = inject(AuthenticationService);
  public $user = this.authService.$user;
}
