import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faL, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Producto } from '../models/Producto.model';
import { FirebaseService } from '../services/api/firebase.service';
import { ProductosFacadeService } from '../services/facade/productos-facade.service';
import { Observable, take, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-productos-page',
  imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule, NgxPaginationModule],
  templateUrl: './productos-page.component.html',
  styleUrl: './productos-page.component.scss'
})
export class ProductosPageComponent {
  editIcon = faPen;
  deleteIcon = faTrash;
  addIcon = faPlus;
  openFormBoolean: boolean = false;
  errorFlagBoolean: boolean = false;
  productos$: Observable<Producto[]>;
  productoId$: Observable<Producto | null>;
  submitted : boolean = false;
  id: string | null = '';
  deleteBoolean: boolean = false;
  p: number = 1;

  constructor(private facadeProducto: ProductosFacadeService) {
    this.productos$ = facadeProducto.productos$;
    this.productoId$ = facadeProducto.productoId$;
  }

  productoForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(45), Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\-_.]+$/)]),
    categoria: new FormControl('', [Validators.required]),
    precio: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(100000)]),
    stock: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(999)])
  });

  openFormModal() {
    this.openFormBoolean = !this.openFormBoolean;
  }

  openDeleteModal(id: string){
    this.id = id;
    this.deleteBoolean = !this.deleteBoolean;
  }

  closeDeleteModal(){
    this.id = null;
    this.deleteBoolean = false;
  }

  limpiarFormulario() {
    this.submitted = false;
    this.productoForm.reset({
      nombre: '',
      categoria: '',
      precio: 0,
      stock: 0
    });
    this.id = null;
  }

  cancelarForm() {
    this.openFormModal();
    this.limpiarFormulario();
    this.errorFlagBoolean = false;
  }


  openEditModal(id: string) {
    this.id = id;
    this.facadeProducto.getProductById(id);
    this.productoId$.pipe(take(1)).subscribe(producto => {
      if (!producto) return;

      this.productoForm.patchValue({
        nombre: producto.nombre,
        categoria: producto.categoria,
        precio: producto.precio,
        stock: producto.stock
      });
      this.productoForm.markAsPristine();
      this.openFormModal();
    })
  }

  enviarDatos() {
    this.submitted = true;
    if (this.productoForm.invalid) {return;}

    let producto: Producto = {
      nombre: this.productoForm.value.nombre ?? '',
      categoria: this.productoForm.value.categoria ?? '',
      precio: this.productoForm.value.precio ?? 0,
      stock: this.productoForm.value.stock ?? 0
    }

    if (this.id && !this.productoForm.dirty) {
      console.log("No se modifico nada");
      this.openFormModal();
      this.limpiarFormulario();
      return;
    }

    if (this.id) {
      this.facadeProducto.updateProduct(this.id, producto);
      this.id = null;
    } else {
      this.facadeProducto.addProduct(producto);
    }
    this.limpiarFormulario();
    this.openFormModal();
    this.errorFlagBoolean = false;
  }

  deleteProduct(id: string){
    this.facadeProducto.deleteProduct(id);
    this.deleteBoolean = false;
  }
}
