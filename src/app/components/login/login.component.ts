import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user;
  public token:any;
  public identity:any;
  public data_error:any;

  constructor(
    private _userService: UserService,
    private _router : Router,
  ) { 
    this.user = new User('','','','','');
  }

  ngOnInit(): void {
  }

  close_alert(){
    this.data_error = '';
  }
  login(loginForm: any){
    if(loginForm.valid){

      this._userService.login(this.user).subscribe(
        response =>{
          console.log(response);
          this.token = response.jwt;
          localStorage.setItem('token', this.token);

          this._userService.login(this.user).subscribe(
            response => {
              localStorage.setItem('identity', JSON.stringify(response.user));
              this._router.navigate(['productos'])
            },
            error => {

            }
          )
        },

        error =>{
          this.data_error = error.error.message;
        }
      );

    }else{

    }
    
  }

}
