import { Injectable } from '@angular/core';
import { FirebaseService } from '../api/firebase.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Producto } from '../../models/Producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosFacadeService {

  private productsSubject = new BehaviorSubject<Producto[]>([]);
  productos$ = this.productsSubject.asObservable();
  private productoIdSubject = new Subject<Producto | null>();
  productoId$ = this.productoIdSubject.asObservable();

  constructor(private firebaseService: FirebaseService) { 
    this.loadProducts();
  }

  loadProducts(){
    this.firebaseService.getProducts().subscribe({
      next: (productos) => {
        this.productsSubject.next(productos)
      },
      error: (err) =>{
        console.error('Error cargando productos', err);
      }
    });
    console.log(this.productos$);
  }

  getProductById(id: string){
    this.firebaseService.getProductById(id).subscribe({
      next: producto => this.productoIdSubject.next(producto),
      error: err => console.error(err) 
    })
  }

  addProduct(product: Producto){
    this.firebaseService.addProduct(product).subscribe(() =>{
      this.loadProducts();
    });
  }

  updateProduct(id: string, producto: Producto){
    this.firebaseService.updateProduct(id, producto).subscribe(() =>{
      this.loadProducts()
    });
  }

  deleteProduct(id:string){
    this.firebaseService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }
}
