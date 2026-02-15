import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../../models/Producto.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private readonly apiUrl = 'https://inventariofirebase-9d248-default-rtdb.firebaseio.com/productos';
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.apiUrl);
  }

  addProduct(product: Producto): Observable<Producto>{
    return this.http.post<Producto>(this.apiUrl, product);
  }

  updateProduct(id: number, product: Producto): Observable<Producto>{
    const apiUpdate = `${this.apiUrl}/${id}`;
    return this.http.put<Producto>(apiUpdate, product);
  }

  deleteProduct(id: number): Observable<Producto>{
    const apiDelete = `${this.apiUrl}/${id}`
    return this.http.delete<Producto>(apiDelete);
  }
}
