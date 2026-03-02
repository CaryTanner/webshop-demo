import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '@module/authentication/service/authentication-service';

@Component({
  selector: 'app-products-view',
  imports: [RouterModule, MatButtonModule],
  templateUrl: './products-view.html',
  styleUrl: './products-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsView {
  private authService = inject(AuthenticationService);
  public $isAdmin = this.authService.isAdmin();
}
