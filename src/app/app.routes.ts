import { Routes } from '@angular/router';
import { ProductosPageComponent } from './productos-page/productos-page.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    {path: '', component: ProductosPageComponent},
    {path: 'productos', component: ProductosPageComponent},
    {path: 'about', component: AboutComponent}
];
