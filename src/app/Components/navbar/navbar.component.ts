import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { AuthService } from '../../Services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit , OnDestroy {

  private numOfCartItemsSubscribtion? : Subscription
  private currentUserNameSubjectSubscribtion? : Subscription
  private isLoggedInSubscribtion? : Subscription

  isLoggedInUser = false;
  cartItemsNum : number = 0
  currentUserName : string|null = null


  constructor (private cartservice:CartService , private authService:AuthService){}

  logOut(){
    this.authService.logOut();
  }

  ngOnInit(): void {
    this.numOfCartItemsSubscribtion =
    this.cartservice.numOfCartItems.subscribe({
      next:(value)=>{this.cartItemsNum = value}
    })
    this.currentUserNameSubjectSubscribtion =
    this.authService.currentUserNameSubject.subscribe({
      next:(value)=>(this.currentUserName = value)
    })

    this.cartservice.getUpdatedCartItems()
    this.isLoggedInSubscribtion =
    this.authService.isLoggedIn.subscribe({
      next:(value)=>{this.isLoggedInUser = value}
    })
  }

  ngOnDestroy(): void {
    this.currentUserNameSubjectSubscribtion?.unsubscribe();
    this.isLoggedInSubscribtion?.unsubscribe();
    this.numOfCartItemsSubscribtion?.unsubscribe()
  }

}
