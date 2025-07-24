import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../Interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  numOfWishListItems = new BehaviorSubject<number>(0);
  wishListProductsId = new BehaviorSubject<string[]>([]);
  
  constructor(private httpClient:HttpClient) {
    this.getLoggedUserWishList().subscribe({
      next: (response) => {
        this.wishListProductsId.next((response.data as Product[]).map((product)=>(product._id)))
      },
      error: (err) => {
        console.log(err);
      }
    });
   }

  addProductToWishList(id:string):Observable<any>
    {
      return this.httpClient.post("https://ecommerce.routemisr.com/api/v1/wishlist" , {productId :id})
    }

  getLoggedUserWishList():Observable<any>
  {
    return this.httpClient.get("https://ecommerce.routemisr.com/api/v1/wishlist")
  }

  removeFromWishList(id:string):Observable<any>
  {
    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`)
  }

  getUpdatedWishListItems(){
   
    this.getLoggedUserWishList().subscribe({
      next : (Response)=> {
        this.numOfWishListItems.next(Response.numOfWishListItems)
      }
    })
  }

  wishListItemQuantity(id:string , count:number):Observable<any>
  {
    return this.httpClient.put(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}` , {count:count})
  }

}
