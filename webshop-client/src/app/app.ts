import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthenticationService } from '@module/authentication/service/authentication-service';
import { ToolbarComponent } from '@common/components/toolbar/toolbar';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ROUTE_PATHS } from './app.routes';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    ToolbarComponent,
    RouterModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  public routePaths = ROUTE_PATHS;
  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);
  public $isMobile = this.handleMobile();

  private authService = inject(AuthenticationService);
  public $isAdmin = this.authService.isAdmin();
  public $isLoggedIn = this.authService.isLoggedIn();

  handleMobile() {
    return toSignal(
      this.breakpointObserver.observe(Breakpoints.XSmall).pipe(
        map((result) => {
          return result.matches;
        }),
      ),
      { initialValue: false },
    );
  }

  toggleShoppingCart() {
    console.log('toggleShoppingCart');
  }

  toggleLogin() {
    if (this.$isLoggedIn()) {
      this.authService.logout();
    } else {
      this.router.navigate([this.routePaths.app['login']], {
        queryParams: { redirectUrl: this.routePaths.app['home'] },
      });
    }
  }
}
