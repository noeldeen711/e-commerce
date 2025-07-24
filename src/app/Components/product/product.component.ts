import { Component, inject, Input, OnDestroy } from '@angular/core';
import { Product } from '../../Interfaces/product';
import { CartService } from '../../Services/cart.service';
import { CartResponse } from '../../Interfaces/cart-response';
import { WishListService } from '../../Services/wish-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnDestroy {

  private addProductToCartSubscribtion? : Subscription;
  private addProductToWishListSubscribtion? : Subscription

  @Input({required:true}) product!:Product

  cartService = inject(CartService);
  wishListService = inject(WishListService)

  addToCart(id:string){
    this.addProductToCartSubscribtion =
    this.cartService.addProductToCart(id).subscribe({
      next : (Response:CartResponse) => {console.log(Response)
        this.cartService.numOfCartItems.next(Response.numOfCartItems)
      },
      error : (err) => {console.log(err)}
    })
  }


  addToWishlist(id: string) {
    this.addProductToWishListSubscribtion =
  this.wishListService.addProductToWishList(id).subscribe({
    next: () => {
      console.log('Added to wishlist!');
    },
    error: (err) => {
      console.error('Failed to add to wishlist', err);
    }
  });
}


ngOnDestroy(): void {
  this.addProductToCartSubscribtion?.unsubscribe();
  this.addProductToWishListSubscribtion?.unsubscribe()
}
}
