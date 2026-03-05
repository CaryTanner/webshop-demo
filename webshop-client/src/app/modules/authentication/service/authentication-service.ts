import { computed, inject, Injectable, signal } from '@angular/core';
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
  private _expiresAt = signal<Date | null>(null);
  public $isAdmin = computed(() => {
    const user = this._user();
    return user?.isAdmin || false;
  });

  public $isLoggedIn = computed(() => {
    const user = this._user();
    const expiresAt = this._expiresAt();
    return !!user && !!expiresAt && expiresAt > new Date();
  });

  constructor() {
    // will maintain state if user refreshes or returns to app with valid session
    this.restoreSession();
  }

  private restoreSession() {
    const token = localStorage.getItem('token');
    const expiresAt = localStorage.getItem('expires_at');
    const userStr = localStorage.getItem('user');

    if (token && expiresAt && userStr) {
      const expiresAtDate = new Date(expiresAt);
      if (expiresAtDate > new Date()) {
        const userData = JSON.parse(userStr);
        this._user.set({ email: userData.email, isAdmin: userData.isAdmin, id: userData.userId });
      } else {
        this.logout();
      }
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user');
    this._user.set(null);
    this.router.navigateByUrl('/');
    this.notificationService.open('Logged out successfully', 'success');
  }

  login({ email, password }: { email: string; password: string }) {
    return this.http.post<LoginResponse>(`${BASE_URL}/auth/login`, { email, password }).pipe(
      map((resp: LoginResponse) => {
        console.log('login response', resp);
        if (!resp.token) {
          throw new Error('Login failed');
        }

        localStorage.setItem('token', resp.token);
        localStorage.setItem('expires_at', resp.expiresAt);
        localStorage.setItem(
          'user',
          JSON.stringify({ email: resp.email, isAdmin: resp.isAdmin, userId: resp.userId }),
        );

        this._user.set({ email: resp.email, isAdmin: resp.isAdmin, id: resp.userId });
        this._expiresAt.set(new Date(resp.expiresAt));

        return of(true); // complete the observable with a success value, data access via signals
      }),
      catchError((err) => {
        return throwError(() => err);
      }),
    );
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
