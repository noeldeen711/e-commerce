import { Component, inject , OnDestroy } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-user-info',
  templateUrl: './update-user-info.component.html',
  styleUrl: './update-user-info.component.css'
})
export class UpdateUserInfoComponent implements OnDestroy {


  private editInfoSubscribtion? : Subscription
  
    authService = inject(AuthService)
    router = inject(Router)
  
    editInfoForm: FormGroup = new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required]),
    })
  
    isLoading = false
    responseErrorMessage = ''
  
    handleEditInfo(){
       
      if(this.editInfoForm.valid){
        this.isLoading = true
        this.editInfoSubscribtion =
        this.authService.editInfo(this.editInfoForm.value).subscribe({
          next:(response)=>{
          this.isLoading = false
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
    this.editInfoSubscribtion?.unsubscribe();
  }

}
