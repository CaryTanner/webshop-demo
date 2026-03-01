import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  imports: [],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductForm {
  private route = inject(ActivatedRoute);
  private $productId = signal(this.route.snapshot.paramMap.get('id'));
  public $viewMode = computed(() => {
    const id = this.$productId();
    if (!id) return 'create';
    return 'edit';
  });
}
