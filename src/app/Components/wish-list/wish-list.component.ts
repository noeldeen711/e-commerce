import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { WishListService } from '../../Services/wish-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent implements OnInit , OnDestroy {

  private getLoggedUserWishListSubscribtion? : Subscription
  private removeFromWishListSubscribtion? : Subscription

  constructor(private wishListService: WishListService) { };

  wishlistItems: any[] = [];

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist() {
    this.getLoggedUserWishListSubscribtion =
    this.wishListService.getLoggedUserWishList().subscribe({
      next: (response) => {
        this.wishlistItems = response.data || [];
      },
      error: (err) => {
        console.error('Failed to load wishlist', err);
      }
    });
  }

  


  removeItem(productId: string) {
    this.removeFromWishListSubscribtion =
    this.wishListService.removeFromWishList(productId).subscribe({
      next: (response) => {
        this.wishListService.wishListProductsId.next(response.data);
        this.wishlistItems = this.wishlistItems.filter(item => item._id !== productId);
      }


    });
  }

  ngOnDestroy(): void {
    this.getLoggedUserWishListSubscribtion?.unsubscribe();
    this.removeFromWishListSubscribtion?.unsubscribe();
  }

}
