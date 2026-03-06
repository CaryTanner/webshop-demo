import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { LoginResponse, User } from '../authentication.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, throwError } from 'rxjs';
import { BASE_URL } from '@env/environment';
import { NotificationService } from '@common/services/notification/notification.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private _user = signal<User | null>(null);
  public $user = this._user.asReadonly();
  public $isAdmin = computed(() => !!this._user()?.isAdmin && !this.isUserSessionExpired());
  public $isLoggedIn = computed(() => !!this._user() && !this.isUserSessionExpired());

  constructor() {
    // will maintain state if user refreshes or returns to app with valid session
    this.restoreSession();

    effect(() => {
      const user = this._user();
      this.handleLocalStorage(user);
    });
  }

  private restoreSession() {
    const token = localStorage.getItem('token');
    const expiresAt = localStorage.getItem('expires_at');
    const userStr = localStorage.getItem('user');

    if (token && expiresAt && userStr) {
      const expiresAtDate = new Date(expiresAt);
      if (!isNaN(expiresAtDate.getTime()) && expiresAtDate > new Date()) {
        try {
          const userData = JSON.parse(userStr);
          this._user.set(userData);
        } catch {
          // eslint-disable-next-line no-console
          console.info('User storage string invalid');
          this.logout(false);
        }
      } else {
        this.logout(false);
      }
    }
  }

  isUserSessionExpired(): boolean {
    const user = this._user();
    if (!user || !user.expiresAt) return true;

    const expiresAtDate = new Date(user.expiresAt);
    if (isNaN(expiresAtDate.getTime())) return true; // invalid date

    return expiresAtDate < new Date();
  }

  logout(showNotification = true) {
    this._user.set(null);
    this.router.navigateByUrl('/');
    if (showNotification) {
      this.notificationService.open('Logged out successfully', 'success');
    }
  }

  login({ email, password }: { email: string; password: string }) {
    return this.http.post<LoginResponse>(`${BASE_URL}/auth/login`, { email, password }).pipe(
      map((resp: LoginResponse) => {
        console.log('login response', resp);
        if (!resp.token) {
          throw new Error('Login failed');
        }

        this._user.set(resp);

        return of(true); // complete the observable with a success value, data access via signals
      }),
      catchError((err) => {
        return throwError(() => err);
      }),
    );
  }

  handleLocalStorage(user: User | null) {
    if (user) {
      localStorage.setItem('token', user.token);
      localStorage.setItem('expires_at', user.expiresAt);
      localStorage.setItem('user', JSON.stringify(user));
      return;
    }
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user');
  }

  testJwt() {
    return this.http.get(`${BASE_URL}/orders`).pipe(
      map((resp) => {
        console.log('test JWT response', resp);
        return of(true);
      }),
      catchError((err) => {
        return throwError(() => err);
      }),
    );
  }
}
