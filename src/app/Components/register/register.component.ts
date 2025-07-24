import { Component, OnDestroy } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { passMatch } from '../Custom validators/pass match';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy {

  private registerSubscribtion? : Subscription

  RegisterFormObj:FormGroup = new FormGroup ({
    name : new FormControl ("" , [Validators.required , Validators.minLength(4) , Validators.maxLength(20)]), 
    email : new FormControl ("" , [Validators.required , Validators.email]), 
    phone : new FormControl ("" , [Validators.required , Validators.pattern(/^01[125][0-9]{8}$/)]), 
    password : new FormControl ("" , [Validators.required ,  Validators.pattern(/^[A-Z][a-z][0-9]{3,}$/)]), 
    rePassword : new FormControl ("" , [Validators.required , Validators.pattern(/^[A-Z][a-z][0-9]{3,}$/) ] ) 
  } , {validators:passMatch})


  responseErrorMessage = ""

  isLoading = false

  constructor(private authService:AuthService , private router:Router){}

  handleSignUp(){


    if(this.RegisterFormObj.valid){

      this.isLoading = true
      this.registerSubscribtion =
       this.authService.register(this.RegisterFormObj.value).subscribe({
      next:(response)=>{
        this.isLoading = false
        this.router.navigate(["/login"])
      },

      error:(err)=>{
        this.isLoading = false
        this.responseErrorMessage = err.error.message
      }
    })

    }
  }

  ngOnDestroy(): void {
    this.registerSubscribtion?.unsubscribe()
  }
}
