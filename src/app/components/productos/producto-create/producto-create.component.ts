import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/Producto';
import { ProductoService } from 'src/app/services/producto.service';


interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
} 

@Component({
  selector: 'app-producto-create',
  templateUrl: './producto-create.component.html',
  styleUrls: ['./producto-create.component.css']
})
export class ProductoCreateComponent implements OnInit {

  public producto;
  public file: File;
  public imgSelect: String | ArrayBuffer | null;
  public categorias: any;
  public success_message:any;
  public error_message:any;
  constructor(
    private _productoService : ProductoService,
  ) {
    this.producto = new Producto('','','','',0,0,0,'',0);
   }

  ngOnInit() {
      this._productoService.get_categorias().subscribe(
      response=>{
        this.categorias = response.categorias;
        console.log(this.categorias);
        
      },
      error=>{

      }
    );
  }

  success_alert(){
    this.success_message = ''; 
   }
 
   error_alert(){
     this.error_message = ''; 
    }
 
   onSubmit(productoForm:any){
     if(productoForm.valid){
      this._productoService.insert_producto({
        titulo: productoForm.value.titulo,
        descripcion: productoForm.value.descripcion,
        imagen: this.file,
        precio_compra: productoForm.value.precio_compra,
        precio_venta: productoForm.value.precio_venta,
        stock: productoForm.value.stock,
        idcategoria: productoForm.value.idcategoria,
        puntos: productoForm.value.puntos,
        
      }).subscribe(
        response =>{
         this.success_message = 'Se registro el producto correctamente';
         this.producto = new Producto('','','','',0,0,0,'',0);
         this.imgSelect = '../../../../assets/img/producto.png';
        },
        error=>{
          
        }
      );
       
     }else{
       this.error_message = 'Complete correctamente el formulario';
  
     }
   }
 
   imgSelected(event: any){
     if(event.target.files  && event.target.files[0]){
         this.file = <File>event.target.files[0];
 
         const reader = new FileReader();
         reader.onload = e => this.imgSelect= reader.result;
         reader.readAsDataURL(this.file);
     }
   }
}
