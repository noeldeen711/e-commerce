import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../Services/products.service';
import { Product } from '../../Interfaces/product';
import { CartService } from '../../Services/cart.service';
import { CartResponse } from '../../Interfaces/cart-response';
import { WishListService } from '../../Services/wish-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit , OnDestroy {

  private getAllProductsSubscribtion? : Subscription
  private wishListProductsIdSubscribtion? : Subscription
  private addProductToCartSubscribtion? : Subscription
  private addProductToWishListSubscribtion? : Subscription
  private removeFromWishListSubscribtion? : Subscription

  productList: Product[] = []
  wishlistItems: any[] = [];
  searchTerm: string = ''
  wishListProductsIdList: string[] = []
  constructor(private productService: ProductService, wishListService: WishListService) { }

  ngOnInit(): void {
    this.getAllProductsSubscribtion =
    this.productService.getAllProducts().subscribe({
      next: (Response) => {
        this.productList = Response.data
      }

    })

    this.wishListProductsIdSubscribtion =
    this.wishListService.wishListProductsId.subscribe((IdList) => { this.wishListProductsIdList = IdList })

  }

  @Input({ required: true }) product!: Product
  isInWishlist: boolean = false;

  cartService = inject(CartService)
  wishListService = inject(WishListService)


  addToCart(id: string) {
    this.addProductToCartSubscribtion =
    this.cartService.addProductToCart(id).subscribe({
      next: (Response: CartResponse) => {
        console.log(Response)
        this.cartService.numOfCartItems.next(Response.numOfCartItems)
      },
      error: (err) => { console.log(err) }
    })
  }

  isWishListProduct(id: string) {
    return this.wishListProductsIdList.includes(id)
  }

  addToWishlist(id: string) {
    this.addProductToWishListSubscribtion =
    this.wishListService.addProductToWishList(id).subscribe({
      next: (response) => {
        console.log('Added to wishlist!');
        this.isInWishlist = true;
        this.wishListService.wishListProductsId.next(response.data);
      },
      error: (err) => {
        console.error('Failed to add to wishlist', err);
      }
    });
  }

  removeItem(productId: string) {
    this.removeFromWishListSubscribtion =
    this.wishListService.removeFromWishList(productId).subscribe(() => {
      this.wishlistItems = this.wishlistItems.filter(item => item._id !== productId);
      this.isInWishlist = false;
    });
  }

  trackByProductId(index: number, product: Product) {
    return product._id;
  }

  selectedPriceFilter: string = 'all';

  get filteredProductList() {
    return this.productList
      .filter(product => {
        const search = this.searchTerm.toLowerCase();
        return product.title.toLowerCase().includes(search);
      })
      .filter(product => {
        if (this.selectedPriceFilter === 'less300') {
          return typeof product.price === 'number' && product.price < 300;
        } else if (this.selectedPriceFilter === '800-1400') {
          return typeof product.price === 'number' && product.price >= 800 && product.price <= 1400;
        } else if (this.selectedPriceFilter === 'over1500') {
          return typeof product.price === 'number' && product.price > 1500;
        } else {
          return true;
        }
      });
  }

  ngOnDestroy(): void {
    this.addProductToCartSubscribtion?.unsubscribe();
    this.addProductToWishListSubscribtion?.unsubscribe();
    this.removeFromWishListSubscribtion?.unsubscribe();
    this.getAllProductsSubscribtion?.unsubscribe();
    this.wishListProductsIdSubscribtion?.unsubscribe()
  }


}
