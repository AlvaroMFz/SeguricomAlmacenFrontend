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

  constructor(
    private _productoService : ProductoService,
  ) { 
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this._productoService.get_productos('').subscribe(
      response => {
        this.productos = response.productos;
        console.log(this.productos);
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

}
