import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GetProductsParams, Product } from '../product.interface';
import { delay, Observable } from 'rxjs';
import { BASE_URL } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);

  getProducts(query?: GetProductsParams): Observable<Product[]> {
    const params = new HttpParams({ fromObject: query as Record<string, string> });
    return this.http.get<Product[]>(`${BASE_URL}/products`, { params }).pipe(delay(500)); // Simulate network delay;
  }

  getProductById(id: number): Observable<Product> {
    console.log('remove delay');
    return this.http.get<Product>(`${BASE_URL}/products/${id}`).pipe(delay(500)); // Simulate network delay
  }

  createProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(`${BASE_URL}/products`, product).pipe(delay(500)); // Simulate network delay
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${BASE_URL}/products/${id}`, product).pipe(delay(500)); // Simulate network delay;
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/products/${id}`).pipe(delay(500)); // Simulate network delay;
  }
}
