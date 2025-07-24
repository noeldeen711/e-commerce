import { Component, OnInit , OnDestroy } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { CartResponse } from '../../Interfaces/cart-response';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit , OnDestroy {

  private getLoggedUserCartSubscribtion? : Subscription
  private removeItemSubscribtion? : Subscription
  private cartItemQuantitySubscribtion? : Subscription
  private removeAllCartSubscribtion? : Subscription

  constructor(private cartService: CartService) { }

  cartDetails: CartResponse | null = null

  ngOnInit(): void {
    this.getLoggedUserCartSubscribtion =
    this.cartService.getLoggedUserCart().subscribe({
      next: (Response) => { this.cartDetails = Response },
      error: (err) => { console.log(err) }
    })
  }

  removeItem(id: string) {
    this.removeItemSubscribtion =
    this.cartService.removeItem(id).subscribe({
      next: (Response) => {
        this.cartDetails = Response
        this.cartService.numOfCartItems.next(Response.numOfCartItems)
      }

    })
  }


  updateProductQuantity(id: string, count: number) {
    this.cartItemQuantitySubscribtion =
    this.cartService.cartItemQuantity(id, count).subscribe({
      next: (Response) => {
        this.cartDetails = Response
        this.cartService.numOfCartItems.next(Response.numOfCartItems)
      }
    })
  }

  clearCart() {
    this.removeAllCartSubscribtion =
    this.cartService.removeAllCart().subscribe({
      next: (Response) => {
        this.cartDetails = null
        this.cartService.numOfCartItems.next(0)
      }
    })
  }

  ngOnDestroy(): void {
    this.getLoggedUserCartSubscribtion?.unsubscribe();
    this.removeItemSubscribtion?.unsubscribe();
    this.cartItemQuantitySubscribtion?.unsubscribe();
    this.removeAllCartSubscribtion?.unsubscribe();
  }
}
