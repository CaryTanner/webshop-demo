import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ROUTE_PATHS } from 'src/app/app.routes';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  public productsPath = ROUTE_PATHS.products['base'];
}
