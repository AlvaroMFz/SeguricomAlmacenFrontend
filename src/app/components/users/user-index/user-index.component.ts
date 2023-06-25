import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../../../services/global'
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css']
})
export class UserIndexComponent implements OnInit {
  public url;
  public usuarios:any;
  public p: number = 1;
  public identity:any;

  constructor(
    private _userService : UserService,
    private _router: Router,
  ) {
    this.url = GLOBAL.url;
    this.identity = _userService.getIdentity();
   }

  ngOnInit() {
    if(this.identity.role == 'ADMIN'){
      this._userService.get_users().subscribe(
        response => {
          this.usuarios = response.usuarios;
        },
        error => {
  
        }
      );
    }else{
      this._router.navigate(['dashboard']);
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

        this._userService.delete_user(id).subscribe(
          response => {
            this._userService.get_users().subscribe(
              response => {
                this.usuarios = response.usuarios;
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


}
