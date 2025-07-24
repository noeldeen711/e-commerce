import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../../Services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {

  private loginSubscribtion? : Subscription

  loginFormObj:FormGroup = new FormGroup ({
    email : new FormControl("" , [Validators.required , Validators.email] ) ,
    password : new FormControl("" , [Validators.required , Validators.pattern(/^[A-Z][a-z][0-9]{3,}$/)] )
  })

  responseErrorMessage = "";
  isLoading = false ;



  constructor ( private authService : AuthService , private router:Router , private cartService : CartService){}

  handleLogin(){

    if(this.loginFormObj.valid){
      this.isLoading = true
      this.loginSubscribtion =
      this.authService.login(this.loginFormObj.value).subscribe({
        next:(response)=>{
        this.isLoading = false
         localStorage.setItem("applicationToken", response.token);
         this.authService.isLoggedIn.next(true)
         this.cartService.getUpdatedCartItems()
         this.authService.currentUserNameSubject.next(response.user.name)
         this.authService.currentUserEmailSubject.next(response.user.email)
        this.router.navigate(["/home"])
      },

      error:(err)=>{
        this.isLoading = false
        this.responseErrorMessage = err.error.message
      }
      })
    }
  }

  ngOnDestroy(): void {
    this.loginSubscribtion?.unsubscribe()
  }
}
