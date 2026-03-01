import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Login } from '@module/authentication/components/login/login';
import { AuthenticationService } from '@module/authentication/service/authentication-service';

@Component({
  selector: 'app-account-view',
  imports: [RouterModule],
  templateUrl: './account-view.html',
  styleUrl: './account-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountView {
  private authService = inject(AuthenticationService);
  public $isLoggedIn = this.authService.isLoggedIn();
  public $isAdmin = this.authService.isAdmin();
  public $user = this.authService.user();
}
