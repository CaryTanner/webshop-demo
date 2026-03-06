import { InjectionToken } from '@angular/core';
import { Category } from '@module/products/product.interface';

export const svgTypes = [
  'Resistor',
  'Capacitor',
  'Inductor',
  'Led',
  'Transistor',
  'IcChip',
  'Microcontroller',
  'Connector',
  'Battery',
  'Sensor',
  'Display',
  'Semiconductor',
];

export const SVG_TYPES = new InjectionToken<string[]>('Unique SVG types for Product');

export const categories: Category[] = [
  { id: 1, name: 'Resistors' },
  { id: 2, name: 'Capacitors' },
  { id: 3, name: 'Inductors' },
  { id: 4, name: 'Semiconductors' },
  { id: 5, name: 'Microcontrollers' },
  { id: 6, name: 'Power' },
  { id: 7, name: 'Connectors' },
  { id: 8, name: 'Sensors' },
  { id: 9, name: 'Displays' },
  { id: 10, name: 'Passive Components' },
];

export const PRODUCT_CATEGORIES = new InjectionToken<Category[]>(
  'Unique product categories used throughout the application.',
);

export const euCountries = [
  'Austria',
  'Belgium',
  'Bulgaria',
  'Croatia',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Estonia',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'Hungary',
  'Ireland',
  'Italy',
  'Latvia',
  'Lithuania',
  'Luxembourg',
  'Malta',
  'Netherlands',
  'Poland',
  'Portugal',
  'Romania',
  'Slovakia',
  'Slovenia',
  'Spain',
  'Sweden',
];

export const EU_COUNTRIES = new InjectionToken<string[]>(' EU countries for shipping ');
