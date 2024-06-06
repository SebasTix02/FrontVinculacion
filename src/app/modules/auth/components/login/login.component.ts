import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {User, UserLoginFields} from '../../../../interfaces/user.interfaces';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  loading:boolean=false;

  //inject toastr -> interactive succes or error messages
  // _userService: consume the service
  constructor(private toastr: ToastrService, private _userService: UserService,
              private router:Router, private _errorService: ErrorService){}

  get userNameEmpty(){
    return this.formLogIn.get('userName') as FormControl;
  }

  get passwordEmpty(){
    return this.formLogIn.get('passwordUser') as FormControl;
  }

  formLogIn= new FormGroup({
    'userName': new FormControl('', Validators.required),
    'passwordUser': new FormControl('', Validators.required)
  })

  login(){
    const user:UserLoginFields ={
      userName: this.formLogIn.get('userName')?.value || '',
      passwordUser: this.formLogIn.get('passwordUser')?.value || ''
    }

    this.loading=true;
    //every time a method returns an observable, i need to suscribe to it
    this._userService.login(user).subscribe({
      next: (token)=>{
        localStorage.setItem('token', token);
        function decodeJWT(token: string) {
          try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
      
            return JSON.parse(jsonPayload);
          } catch (error) {
            console.error('Error decoding token:', error);
            return null;
          }
        }
      
        // Decodificar el token y obtener el userRole
        const decodedToken = decodeJWT(token);
        const userRole = decodedToken ? decodedToken.userRole : null;
        if (userRole === 'Admin') {
          this.router.navigate(['/usuarios']);
        } else {
          alert("No tiene los permisos necesarios para ingresar!!!!")
          this.loading=false;
          this.router.navigate(['/']);
        }
      },
      error:(e: HttpErrorResponse) => {
        this._errorService.msgError(e);
        this.loading=false;
      }
    })

  }
  

}

