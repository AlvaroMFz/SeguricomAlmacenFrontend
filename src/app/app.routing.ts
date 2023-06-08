import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductoIndexComponent } from './components/productos/producto-index/producto-index.component';
import { ProductoCreateComponent } from './components/productos/producto-create/producto-create.component';
import { ProductoEditComponent } from './components/productos/producto-edit/producto-edit.component';
import { UserIndexComponent } from './components/users/user-index/user-index.component';
import { UserCreateComponent } from './components/users/user-create/user-create.component';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';

const appRoute : Routes = [
    {path: '', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'productos', component: ProductoIndexComponent},
    {path: 'producto/registrar', component: ProductoCreateComponent},
    {path: 'producto/editar/:id', component: ProductoEditComponent},
    {path: 'usuarios', component: UserIndexComponent},
    {path: 'usuarios/registrar', component: UserCreateComponent},
    {path: 'usuario/editar/:id', component: UserEditComponent},
]

export const appRoutingProviders : any[] = [];
export const routing:ModuleWithProviders<any> = RouterModule.forRoot(appRoute);
