import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { GLOBAL } from 'src/app/services/global'
import Swal from 'sweetalert2';

declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.css']
})
export class ProductoIndexComponent implements OnInit {

  public productos: any;
  public url;
  public filtro!: string;
  public categorias:any;
  public titulo_cat:any;
  public descripcion_cat:any;

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

}
