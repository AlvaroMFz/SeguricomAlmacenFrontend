import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { GLOBAL } from 'src/app/services/global'
import Swal from 'sweetalert2';
import {MatPaginatorModule} from '@angular/material/paginator';

declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.css'],
})
export class ProductoIndexComponent implements OnInit {

  public productos: any;
  public url;
  public filtro!: string;
  public categorias:any;
  public titulo_cat:any;
  public descripcion_cat:any;
  public p: number = 1;
  public producto_stock: any;
  public producto_id:any;
  public success_message:any;

  constructor(
    private _productoService : ProductoService,
  ) { 
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this._productoService.get_productos('').subscribe(
      response => {
        this.productos = response.productos;
      },
      error => {

      }
    );

    this._productoService.get_categorias().subscribe(
      response => {
        this.categorias = response.categorias;
      },
      error => {

      }
    );
  }
  search(searchForm: any){

    console.log(searchForm.value.filtro);
    this._productoService.get_productos(searchForm.value.filtro).subscribe(
      response =>{
        this.productos = response.productos;
      },
      error=>{

      }
    );
    
  }
  save_cat(categoriaForm:any){
    if(categoriaForm.valid){
      this._productoService.insert_categoria({
        titulo : categoriaForm.value.titulo_cat,
        descripcion: categoriaForm.value.descripcion_cat,
      }).subscribe(
        response => {
          this._productoService.get_categorias().subscribe(
            response => {
              this.categorias = response.categorias;
              $('#modal-save-categoria').modal('hide');
            },
            error => {

            }
          );
        },
        error => {

        }
      );
    }else{

    }
  }

  eliminar(id:any){
    Swal.fire({
      title: 'Estas seguro de elimarlo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo !',
      cancelButtonText: 'No, cancelar !',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Producto eliminado',
          'Se eliminó correctamente',
          'success'
        )

        this._productoService.delete_producto(id).subscribe(
          response => {
            this._productoService.get_productos('').subscribe(
              response => {
                this.productos = response.productos;
              },
              error => {

              }
            );
          },
          error => {

          }
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'Se canceló la solicitud',
          'error'
        )
      }
    }) 
  }

  get_id(id:any){
    this.producto_id = id;
  }

  close_alert(){
    this.success_message = '';
  }

  aumentar_stock(stockForm:any) {
    if(stockForm.valid){
      if(this.producto_id){
        this._productoService.stock_producto({
          _id: this.producto_id,
          stock: stockForm.value.producto_stock,
        }).subscribe(
          response => {
            this.success_message = 'Se aumentó el stock correctamente';
            this._productoService.get_productos('').subscribe(
              response => {
                this.productos = response.productos;
                $('.modal').modal('hide');
              },
              error => {
                
              }
            );
          },
          error => {

          }
        );
      }
      
    }
  }

}
