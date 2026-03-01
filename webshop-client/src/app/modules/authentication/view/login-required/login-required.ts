import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Login } from '@module/authentication/components/login/login';

@Component({
  selector: 'app-login-required',
  imports: [Login],
  templateUrl: './login-required.html',
  styleUrl: './login-required.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginRequired {
  private route = inject(ActivatedRoute);
  private $params = signal(this.route.snapshot.queryParams);
  public $message = computed(() => {
    const section = this.$params()?.['redirectUrl']?.split('/')[1];
    return section ? `Please log in to access your ${section} details` : 'Please log in';
  });
  public $title = computed(() => {
    const section = this.$params()?.['redirectUrl']?.split('/')[1];
    return section && section === 'home' ? `Login` : 'Login required';
  });
}
