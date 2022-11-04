import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private listUrl = 'http://localhost:8080/api/product/list';
  private registerUrl = 'http://localhost:8080/api/product/register'
  private deleteUrl = 'http://localhost:8080/api/product/delete/'
  private editUrl = 'http://localhost:8080/api/product/edit'

  constructor(private HttpClient : HttpClient) { }

  getProductList() : Observable<Product[]> {
    return this.HttpClient.get<Product[]>(`${this.listUrl}`);
  }

  Addproduct (product : Product) : Observable<Object> {
    return this.HttpClient.post(`${this.registerUrl}`, product);
  }

  deleteProduct (product : Product) : Observable<Object> {
    return this.HttpClient.delete(`${this.deleteUrl + product.id}`);
  }

  editProduct (product : Product) : Observable<Object> {
    return this.HttpClient.post(`${this.editUrl}`, product);
  }

}
