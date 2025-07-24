import { Component, inject, OnInit , OnDestroy } from '@angular/core';
import { ProductService } from '../../Services/products.service';
import { Category } from '../../Interfaces/category';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories-slider',
  templateUrl: './categories-slider.component.html',
  styleUrl: './categories-slider.component.css'
})
export class CategoriesSliderComponent implements OnInit , OnDestroy{

  private getAllCategoriesSubscribtion? : Subscription
  productService = inject(ProductService)
  categoriesList : Category [] = []


  
    customOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: false,
      navSpeed: 700,
      autoplay : true ,
      autoplayTimeout :2500,
      navText: ['<<', '>>'],
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
          items: 7
        }
      },
      nav: true
    }




  ngOnInit(): void {
    this.getAllCategoriesSubscribtion = 
    this.productService.getAllCategories().subscribe({
      next : (Response) => {
        this.categoriesList = Response.data
      }
    })
  }

  ngOnDestroy(): void {
    this.getAllCategoriesSubscribtion?.unsubscribe();
  }


}
