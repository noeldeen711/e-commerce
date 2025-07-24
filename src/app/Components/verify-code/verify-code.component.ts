import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.css'
})
export class VerifyCodeComponent implements OnDestroy {

  private verifyCodeSubscribtion? : Subscription

   verifyCodeForm:FormGroup = new FormGroup ({
        resetCode : new FormControl("" , [Validators.required] ) ,
      })


    responseErrorMessage = ''
    isLoading = false

    constructor ( private authService : AuthService , private router:Router){}

    handleForgetCode(){


      if(this.verifyCodeForm.valid){
        this.isLoading = true
        this.verifyCodeSubscribtion =
        this.authService.verifyCode(this.verifyCodeForm.value).subscribe({
        next:(response)=>{
        this.isLoading = false
        this.router.navigate(["/reset-pass"])
      },

      error:(err)=>{
        this.isLoading = false
        this.responseErrorMessage = err.error.message
      }
      })
    }

    }

    ngOnDestroy(): void {
      this.verifyCodeSubscribtion?.unsubscribe()
    }
}




