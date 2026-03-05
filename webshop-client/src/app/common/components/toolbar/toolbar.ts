import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ROUTE_PATHS } from 'src/app/app.routes';
import { MatBadgeModule } from '@angular/material/badge';
@Component({
  selector: 'app-toolbar',
  imports: [MatButtonModule, MatIconModule, RouterModule, MatBadgeModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  public homePath = ROUTE_PATHS.app['home'];
  $isLoggedIn = input<boolean>(false);
  $numCartItems = input<number>();
  toggleCart = output<void>();
  toggleSideNav = output<void>();
  toggleLogin = output<void>();
  $hasItems = computed(() => {
    return !!this.$numCartItems();
  });
}
