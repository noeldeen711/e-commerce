import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, OnDestroy {

  private currentUserNameSubjectSubscribtion?: Subscription
  private currentUserEmailSubjectSubscribtion?: Subscription

  currentUserName: string | null = null
  currentUserEmail: string | null = null

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUserNameSubjectSubscribtion =
      this.authService.currentUserNameSubject.subscribe({
        next: (value) => (this.currentUserName = value)
      })

    this.currentUserEmailSubjectSubscribtion =
      this.authService.currentUserEmailSubject.subscribe({
        next: (value) => (this.currentUserEmail = value)
      })

  }

  ngOnDestroy(): void {
    this.currentUserEmailSubjectSubscribtion?.unsubscribe();
    this.currentUserNameSubjectSubscribtion?.unsubscribe();
  }


}
