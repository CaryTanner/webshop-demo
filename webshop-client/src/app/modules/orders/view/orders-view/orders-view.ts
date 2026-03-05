import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-orders-view',
  imports: [RouterModule],
  templateUrl: './orders-view.html',
  styleUrl: './orders-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersView {}
