import { Component, Input, input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Services/products.service';
import { Product } from '../../Interfaces/product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnChanges , OnDestroy{

  private getProductDetailsSubscribtion? : Subscription;

  productId : string | null = null;
  productDetails : Product | null = null

  @Input() id! : string|null ;

  constructor (private activatedRoute : ActivatedRoute , private productServices : ProductService){}



  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay : true ,
    autoplayTimeout :3000,
    navText: ['Prev', 'Next'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }



  ngOnChanges(changes: SimpleChanges): void {
     if (this.id != null && changes['id'].previousValue != changes['id'].currentValue){
      this.getProductDetailsSubscribtion =
      this.productServices.getProductDetails(this.id).subscribe({
            next: (Response)=> { console.log (Response)
              this.productDetails = Response.data ;
            }
          })
    }
  }

  ngOnDestroy(): void {
    this.getProductDetailsSubscribtion?.unsubscribe()
  }

}
