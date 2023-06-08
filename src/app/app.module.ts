import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { routing } from './app.routing'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductoIndexComponent } from './components/productos/producto-index/producto-index.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ProductoCreateComponent } from './components/productos/producto-create/producto-create.component';
import { ProductoEditComponent } from './components/productos/producto-edit/producto-edit.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserIndexComponent } from './components/users/user-index/user-index.component';
import { UserCreateComponent } from './components/users/user-create/user-create.component';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ProductoIndexComponent,
    SidebarComponent,
    ProductoCreateComponent,
    ProductoEditComponent,
    UserIndexComponent,
    UserCreateComponent,
    UserEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    routing,
    NgxPaginationModule,
    NoopAnimationsModule,    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
