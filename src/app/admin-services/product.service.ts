import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the Product interface
export interface Product {
  ProductId: number;
  ProductName: string;
  Productimg: string;
  Price: number;
  Description: string;
  StockQuantity: number;
  CategoryId: number;
  CreatedByAdminId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // Replace with your actual API endpoint
  private apiUrl = 'https://localhost:44348/api/Products';

  constructor(private http: HttpClient) { }

  // Method to fetch all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Method to add a product
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // Method to update a product
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  // Method to delete a product
  deleteProduct(id: number): Observable<void> {
    console.log(id)
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
