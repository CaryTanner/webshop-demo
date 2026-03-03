import { OrderItem } from '@module/orders/order.interface';

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  svgType: SvgType;
  categories?: Category[];
  orderItems?: OrderItem[];
}

export interface Category {
  id: number;
  name: string;
}

export enum SvgType {
  Resistor = 'Resistor',
  Capacitor = 'Capacitor',
  Inductor = 'Inductor',
  Led = 'Led',
  Transistor = 'Transistor',
  IcChip = 'IcChip',
  Microcontroller = 'Microcontroller',
  Connector = 'Connector',
  Battery = 'Battery',
  Sensor = 'Sensor',
  Display = 'Display',
  Semiconductor = 'Semiconductor',
}

export interface GetProductsParams {
  search?: string;
  sortBy?: 'name' | 'price';
  inStock?: boolean;
  categoryIds?: number[];
  skip?: number;
  limit?: number;
}
