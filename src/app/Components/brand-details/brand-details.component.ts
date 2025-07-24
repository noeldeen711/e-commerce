import { Component, Input, SimpleChanges , OnDestroy } from '@angular/core';
import { Brands } from '../../Interfaces/brands';
import { ActivatedRoute } from '@angular/router';
import { BrandService } from '../../Services/brand.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.css'
})
export class BrandDetailsComponent implements OnDestroy {

    private getBrandDetailsSubscribtion? : Subscription
  

  brandtId: string | null = null;
  brandDetails: Brands | null = null

  @Input() id!: string | null;

  constructor(private activatedRoute: ActivatedRoute, private brandServices: BrandService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.id != null && changes['id'].previousValue != changes['id'].currentValue) {
      this.getBrandDetailsSubscribtion =
      this.brandServices.getBrandDetails(this.id).subscribe({
        next: (Response) => {
          console.log(Response)
          this.brandDetails = Response.data;
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.getBrandDetailsSubscribtion?.unsubscribe();
  }
}
