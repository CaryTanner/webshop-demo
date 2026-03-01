import { Product } from '@module/products/product.interface';
import { User } from '../authentication/authentication.interface';

export interface Order {
  id: number;
  createdAt: string; // ISO date string
  status: OrderStatus;
  userId?: number;
  user?: User;
  items: OrderItem[];
  payment?: Payment;
  shipping?: Shipping;
  total: number;
}

export enum OrderStatus {
  Draft = 'Draft',
  Pending = 'Pending',
  Processing = 'Processing',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
}

export interface OrderItem {
  id: number;
  quantity: number;
  unitPrice: number;
  orderId: number;
  productId: number;
  product?: Product;
}

export interface Payment {
  id: number;
  method: PaymentMethod;
  status: PaymentStatus;
  paidAt?: string; // ISO date string
  orderId: number;
}

export enum PaymentMethod {
  Klarna = 'Klarna',
  Stripe = 'Stripe',
  PayPal = 'PayPal',
}

export enum PaymentStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Failed = 'Failed',
  Refunded = 'Refunded',
}

export interface Shipping {
  id: number;
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  trackingNumber?: string;
  method: ShippingMethod;
  orderId: number;
}

export enum ShippingMethod {
  PostNord = 'PostNord',
  DHL = 'DHL',
  Bring = 'Bring',
}
