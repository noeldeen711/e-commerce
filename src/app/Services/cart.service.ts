import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  numOfCartItems = new BehaviorSubject<number>(0);
  numOfWishListItems = new BehaviorSubject<number>(0);

  constructor(private httpClient:HttpClient) { }


  addProductToCart(id:string):Observable<any>
  {
    return this.httpClient.post("https://ecommerce.routemisr.com/api/v1/cart" , {productId :id})
  }

  getLoggedUserCart():Observable<any>
  {
    return this.httpClient.get("https://ecommerce.routemisr.com/api/v1/cart")
  }

  removeItem(id:string):Observable<any>
  {
    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`)
  }

  cartItemQuantity(id:string , count:number):Observable<any>
  {
    return this.httpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {count:count})
  }

  removeAllCart():Observable<any>
  {
    return this.httpClient.delete('https://ecommerce.routemisr.com/api/v1/cart')
  }

  getUpdatedCartItems(){
   
    this.getLoggedUserCart().subscribe({
      next : (Response)=> {
        this.numOfCartItems.next(Response.numOfCartItems)
      }
    })
  }
}
