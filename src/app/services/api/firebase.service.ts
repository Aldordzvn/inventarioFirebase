import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Producto } from '../../models/Producto.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private readonly apiUrl = 'https://inventariofirebase-9d248-default-rtdb.firebaseio.com/productos';
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Producto[]>{
    let getProducts = `${this.apiUrl}.json`;
    return this.http.get<{[key: string]: Producto}>(getProducts).pipe(
      map(response => this.mapFireBaseoBject(response))
    );
  }

  getProductById(id:string): Observable<Producto | null>{
    let urlProductId = `${this.apiUrl}/${id}.json`;
    return this.http.get<Producto | null>(urlProductId);
  }

  addProduct(product: Producto): Observable<Producto>{
    let postProduct = `${this.apiUrl}.json`;
    return this.http.post<Producto>(postProduct, product);
  }

  updateProduct(id: string, product: Producto): Observable<Producto>{
    const apiUpdate = `${this.apiUrl}/${id}.json`;
    return this.http.put<Producto>(apiUpdate, product);
  }

  deleteProduct(id: string): Observable<Producto>{
    const apiDelete = `${this.apiUrl}/${id}.json`
    return this.http.delete<Producto>(apiDelete);
  }

  private mapFireBaseoBject<T>(data: {[key:string]: T} | null): (T & {id:string})[]{
    if(!data) return [];

    return Object.keys(data).map(key => ({
      id: key,
      ...data[key]
    }));
  }
}
