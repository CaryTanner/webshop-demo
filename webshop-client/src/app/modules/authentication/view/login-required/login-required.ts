import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '@module/authentication/components/login/login';

@Component({
  selector: 'app-login-required',
  imports: [Login],
  templateUrl: './login-required.html',
  styleUrl: './login-required.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginRequired {
  private router = inject(Router);
  public section = this.router.url.split('/')[1];
}
