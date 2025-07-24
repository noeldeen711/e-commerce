import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrl: './reset-pass.component.css'
})
export class ResetPassComponent implements OnDestroy {

  private resetPasswordSubscribtion? : Subscription

  resetPassForm:FormGroup = new FormGroup ({
          email : new FormControl("" , [Validators.required ,Validators.email] ) ,
          newPassword : new FormControl("" , [Validators.required , Validators.pattern(/^[A-Z][a-z][0-9]{3,}$/)] ) ,
        })
      



  isLoading = false
  responseErrorMessage = ''

  constructor ( private authService : AuthService , private router:Router){}

  handleResetPass(){
    
    if(this.resetPassForm.valid){
      this.isLoading = true
      this.resetPasswordSubscribtion =
      this.authService.resetPassword(this.resetPassForm.value).subscribe({
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
  this.resetPasswordSubscribtion?.unsubscribe()
}

}
