import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../product.interface';
import { Observable } from 'rxjs';
import { BASE_URL } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);

  getProducts(params?: HttpParams): Observable<Product[]> {
    return this.http.get<Product[]>(`${BASE_URL}/products`, { params });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${BASE_URL}/products/${id}`);
  }

  createProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(`${BASE_URL}/products`, product);
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${BASE_URL}/products/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/products/${id}`);
  }
}
