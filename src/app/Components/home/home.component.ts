import { Component, inject, OnInit , OnDestroy } from '@angular/core';
import { ProductService } from '../../Services/products.service';
import { Product } from '../../Interfaces/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit , OnDestroy {


  private editInfoSubscribtion? : Subscription
  productService = inject(ProductService)
  productList:Product [] = []

  ngOnInit(): void {
    this.editInfoSubscribtion =
    this.productService.getAllProducts().subscribe({
      next:(response)=>{console.log( "All Products Response" , response)
        this.productList = response.data ;
      },
      error:(err)=> (console.log(err))
    })
  }

  ngOnDestroy(): void {
    this.editInfoSubscribtion?.unsubscribe()
  }


}







