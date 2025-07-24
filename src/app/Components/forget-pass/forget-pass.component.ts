import { Component , OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrl: './forget-pass.component.css'
})
export class ForgetPassComponent implements OnDestroy {

  private forgetPassSubscribtion? : Subscription

  forgetPassForm:FormGroup = new FormGroup ({
      email : new FormControl("" , [Validators.required , Validators.email] ) ,
    })


    responseErrorMessage = ''

    isLoading = false


    constructor ( private authService : AuthService , private router:Router){}

    handleForget(){

       if(this.forgetPassForm.valid){
        this.isLoading = true
        this.forgetPassSubscribtion =
      this.authService.forgetPass(this.forgetPassForm.value).subscribe({
        next:(response)=>{
        this.isLoading = false
        this.router.navigate(["/verify-code"])
      },

      error:(err)=>{
        this.isLoading = false
        this.responseErrorMessage = err.error.message
      }
      })
    }

    }

    ngOnDestroy(): void {
      this.forgetPassSubscribtion?.unsubscribe();
    }
}
