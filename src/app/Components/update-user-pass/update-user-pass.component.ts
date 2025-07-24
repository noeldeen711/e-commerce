import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-user-pass',
  templateUrl: './update-user-pass.component.html',
  styleUrl: './update-user-pass.component.css'
})
export class UpdateUserPassComponent implements OnDestroy {

  private resetPassSubscribtion?: Subscription


  authService = inject(AuthService)
  router = inject(Router)

  resetPasswordForm: FormGroup = new FormGroup({
    currentPassword: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required, Validators.pattern(/^[A-Z][a-z][0-9]{3,}$/)]),
    rePassword: new FormControl("", [Validators.required, Validators.pattern(/^[A-Z][a-z][0-9]{3,}$/)]),
  })

  isLoading = false
  responseErrorMessage = ''

  handleResetPassword() {

    if (this.resetPasswordForm.valid) {
      this.isLoading = true
      this.resetPassSubscribtion =
        this.authService.resetPass(this.resetPasswordForm.value).subscribe({
          next: (response) => {
            this.isLoading = false
            this.router.navigate(["/login"])
          },

          error: (err) => {
            this.isLoading = false
            this.responseErrorMessage = err.error.message
          }
        })
    }
  }

  ngOnDestroy(): void {
    this.resetPassSubscribtion?.unsubscribe()
  }
}


