import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/global';
import { ProductoService } from 'src/app/services/producto.service';

interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
} 

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.css']
})
export class ProductoEditComponent implements OnInit {

  public producto:any;
  public id:any;
  public categorias:any;
  public url:any;
  public file: File;
  public imgSelect: String | ArrayBuffer | null;
  public success_message:any;
  public error_message:any;
  public stock:any;
  constructor(
    private _route: ActivatedRoute,
    private _productoService: ProductoService,
  ) {
      this.url = GLOBAL.url;
   }

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      this.id = params['id'];
      this._productoService.get_producto(this.id).subscribe(
        response=>{
          this.producto = response.producto;
          
          this._productoService.get_categorias().subscribe(
            response=>{
              this.categorias = response.categorias;
              console.log(this.categorias);
              
            },
            error=>{
      
            }
          );
        },
        error=>{

        }
      );
    });

    
  }
  success_alert(){
    this.success_message = ''; 
   }
 
   error_alert(){
     this.error_message = ''; 
    }
  onSubmit(productoForm:any){
    if(productoForm.valid){
      this._productoService.update_producto(
        {
          _id: this.id,
          titulo: productoForm.value.titulo,
          descripcion: productoForm.value.descripcion,
          imagen: this.file,
          precio_compra: productoForm.value.precio_compra,
          precio_venta: productoForm.value.precio_venta,
          stock: productoForm.value.stock,
          idcategoria: productoForm.value.idcategoria,
          puntos: productoForm.value.puntos,
          img_name : this.producto.imagen,
        }
      ).subscribe(
        response => {
          console.log(response);
          this.success_message = 'Se actualizó el producto correctamente';
        },
        error => {

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
