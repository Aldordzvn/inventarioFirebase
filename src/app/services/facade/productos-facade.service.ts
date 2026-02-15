import { Injectable } from '@angular/core';
import { FirebaseService } from '../api/firebase.service';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../../models/Producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosFacadeService {

  private productsSubject = new BehaviorSubject<Producto[]>([]);
  productos$ = this.productsSubject.asObservable();

  constructor(private firebaseService: FirebaseService) { }

  loadProducts(){
    this.firebaseService.getProducts().subscribe({
      next: (productos) => {
        this.productsSubject.next(productos)
      },
      error: (err) =>{
        console.error('Error cargando productos', err);
      }
    });
  }

  addProduct(product: Producto){
    this.firebaseService.addProduct(product).subscribe(() =>{
      this.loadProducts();
    });
  }

  updateProduct(id: number, producto: Producto){
    this.firebaseService.updateProduct(id, producto).subscribe(() =>{
      this.loadProducts()
    });
  }

  deleteProduct(id:number){
    this.firebaseService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }
}
