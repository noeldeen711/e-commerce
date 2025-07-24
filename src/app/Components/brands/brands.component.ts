import { Component, inject, Input, OnInit , OnDestroy } from '@angular/core';
import { BrandService } from '../../Services/brand.service';
import { Brands } from '../../Interfaces/brands';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit , OnDestroy {

  @Input({ required: true }) brands!: Brands 

  private getAllBrandsSubscribtion? : Subscription

  brandService = inject(BrandService);
  brandList: any[] = []

  ngOnInit(): void {
    this.getAllBrandsSubscribtion =
    this.brandService.getAllBrands().subscribe({
      next: (Response) => {
        console.log(Response)
        this.brandList = Response.data
      },
      error: (err) => { console.log(err) }
    })
  }

  ngOnDestroy(): void {
    this.getAllBrandsSubscribtion?.unsubscribe();
  }

}
