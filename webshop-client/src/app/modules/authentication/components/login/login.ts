import { Component, computed, inject, model, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@module/authentication/service/authentication-service';
import { firstValueFrom } from 'rxjs';
import { ROUTE_PATHS } from 'src/app/app.routes';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private homePath = ROUTE_PATHS.app['home'];
  fb = inject(FormBuilder);
  authService = inject(AuthenticationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private $params = signal(this.route.snapshot.queryParams);
  public $redirectUrl = computed(() => {
    const url = this.$params()?.['redirectUrl'];
    return url ? url : null;
  });
  $loading = model(false);
  loginForm: FormGroup = this.fb.group({
    email: ['admin.one@cgitest.com', [Validators.required, Validators.email]],
    password: ['admin123', [Validators.required]],
  });

  async onSubmit() {
    this.$loading.set(true);
    if (this.loginForm.valid) {
      // handle login
      try {
        await firstValueFrom(this.authService.login(this.loginForm.value));
        this.router.navigateByUrl(this.$redirectUrl() || this.homePath);
      } catch {
        this.loginForm.controls['email']?.setErrors({ loginFailed: true });
      } finally {
        this.$loading.set(false);
      }
    }
  }
}
