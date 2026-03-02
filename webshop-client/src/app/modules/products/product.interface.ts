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

export interface OrderItem {
  id: number;
  quantity: number;
  unitPrice: number;
  orderId: number;
  productId: number;
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
