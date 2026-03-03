import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  Order,
  OrderItem,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  ShippingMethod,
} from '@module/orders/order.interface';
import { ProductCard } from '@module/products/components/product-card/product-card';
import { ProductsList } from '@module/products/components/products-list/products-list';
import { Product } from '@module/products/product.interface';

const mockProducts = [
  {
    id: 9,
    name: '0.1µF Bypass Capacitor',
    description: 'Decoupling capacitor for power lines',
    price: 2.0,
    stock: 400,
    svgType: 'Capacitor',
    categories: [
      {
        id: 2,
        name: 'Capacitors',
      },
      {
        id: 10,
        name: 'Passive Components',
      },
    ],
  },
  {
    id: 10,
    name: '1000µF Electrolytic Capacitor',
    description: 'Large smoothing capacitor 16V',
    price: 6.0,
    stock: 150,
    svgType: 'Capacitor',
    categories: [
      {
        id: 2,
        name: 'Capacitors',
      },
      {
        id: 10,
        name: 'Passive Components',
      },
    ],
  },
  {
    id: 11,
    name: '100µH Inductor',
    description: 'Small signal inductor',
    price: 5.0,
    stock: 200,
    svgType: 'Inductor',
    categories: [
      {
        id: 3,
        name: 'Inductors',
      },
      {
        id: 10,
        name: 'Passive Components',
      },
    ],
  },
] as Product[];

@Component({
  selector: 'app-cart',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ProductCard,
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cart {
  mock = mockProducts;
  mockOrders: Order[] = [
    {
      id: 1,
      createdAt: '2024-06-01T10:00:00Z',
      status: OrderStatus.Draft,
      userId: 1,
      items: [
        {
          id: 1,
          quantity: 2,
          unitPrice: mockProducts[0].price,
          orderId: 1,
          productId: mockProducts[0].id,
          product: mockProducts[0],
        },
        {
          id: 2,
          quantity: 1,
          unitPrice: mockProducts[1].price,
          orderId: 1,
          productId: mockProducts[1].id,
          product: mockProducts[1],
        },
      ],
      payment: {
        id: 1,
        method: PaymentMethod.Stripe,
        status: PaymentStatus.Pending,
        orderId: 1,
      },
      shipping: {
        id: 1,
        fullName: 'Alice Example',
        address: '123 Main St',
        city: 'Techville',
        postalCode: '12345',
        country: 'USA',
        method: ShippingMethod.DHL,
        orderId: 1,
      },
      total: 2 * mockProducts[0].price + 1 * mockProducts[1].price,
    },
    {
      id: 2,
      createdAt: '2024-06-02T14:30:00Z',
      status: OrderStatus.Processing,
      userId: 102,
      items: [
        {
          id: 3,
          quantity: 3,
          unitPrice: mockProducts[2].price,
          orderId: 2,
          productId: mockProducts[2].id,
          product: mockProducts[2],
        },
      ],
      payment: {
        id: 2,
        method: PaymentMethod.PayPal,
        status: PaymentStatus.Completed,
        orderId: 2,
      },
      shipping: {
        id: 2,
        fullName: 'Bob Example',
        address: '456 Side St',
        city: 'Component City',
        postalCode: '67890',
        country: 'USA',
        method: ShippingMethod.PostNord,
        orderId: 2,
      },
      total: 3 * mockProducts[2].price,
    },
    {
      id: 3,
      createdAt: '2024-06-03T09:15:00Z',
      status: OrderStatus.Shipped,
      userId: 103,
      items: [
        {
          id: 4,
          quantity: 1,
          unitPrice: mockProducts[1].price,
          orderId: 3,
          productId: mockProducts[1].id,
          product: mockProducts[1],
        },
        {
          id: 5,
          quantity: 2,
          unitPrice: mockProducts[2].price,
          orderId: 3,
          productId: mockProducts[2].id,
          product: mockProducts[2],
        },
      ],
      payment: {
        id: 3,
        method: PaymentMethod.Klarna,
        status: PaymentStatus.Completed,
        orderId: 3,
      },
      shipping: {
        id: 3,
        fullName: 'Charlie Example',
        address: '789 Circuit Ave',
        city: 'Electro Town',
        postalCode: '54321',
        country: 'USA',
        method: ShippingMethod.Bring,
        orderId: 3,
      },
      total: 1 * mockProducts[1].price + 2 * mockProducts[2].price,
    },
  ];
  fb = inject(FormBuilder);
  public form = this.fb.group({
    id: null, // order id
    createdAt: '',
    status: OrderStatus.Draft,
    userId: null,
    items: this.fb.array([]),
  });

  get itemsArr() {
    return (this.form?.get('items') as FormArray) ?? this.fb.array([]);
  }

  addAndPatchItem(orderItem: OrderItem) {
    this.itemsArr.push(
      this.fb.group({
        id: orderItem.id,
        quantity: orderItem.quantity,
        unitPrice: orderItem.unitPrice,
        orderId: orderItem.orderId,
        productId: orderItem.productId,
        product: orderItem.product,
      }),
    );
  }

  onDeleteItem(index: number) {
    this.itemsArr.removeAt(index);
  }

  ngOnInit() {
    this.form.valueChanges.subscribe((val) => console.log('Form value changed:', val));
    console.log('Mock orders:', this.mockOrders);
    this.mockOrders[0].items.forEach((item) => this.addAndPatchItem(item));
  }
}
