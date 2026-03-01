import { Component, inject, model } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthenticationService } from '@module/authentication/service/authentication-service';
import { firstValueFrom } from 'rxjs';

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
  fb = inject(FormBuilder);
  authService = inject(AuthenticationService);
  $loading = model(false);
  loginForm: FormGroup = this.fb.group({
    email: ['admin.one@cgitest.com', [Validators.required, Validators.email]],
    password: ['admin123', [Validators.required]],
  });

  async onSubmit() {
    console.log('Login form submitted', this.loginForm.value);
    if (this.loginForm.valid) {
      // handle login
      try {
        await firstValueFrom(this.authService.login(this.loginForm.value));
        await firstValueFrom(this.authService.testJwt());
      } catch {
        this.loginForm.controls['email']?.setErrors({ loginFailed: true });
      }
    }
  }
}
