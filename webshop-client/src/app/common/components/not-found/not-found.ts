import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ROUTE_PATHS } from 'src/app/app.routes';

@Component({
  selector: 'app-not-found',
  imports: [RouterModule, MatIconModule, MatButtonModule],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {
  public homePath = ROUTE_PATHS.app['home'];
}
