import { Component, inject, Input, input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../Services/order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shipping-adress',
  templateUrl: './shipping-adress.component.html',
  styleUrl: './shipping-adress.component.css'
})
export class ShippingAddressComponent implements OnDestroy {

  private checkOutSubscribtion? : Subscription

  @Input() id!:string
  shippingAddressForm = new FormGroup ({
    details : new FormControl ('' , (Validators.required)),
    phone : new FormControl ('' , [Validators.required , Validators.pattern(/^01[125][0-9]{8}$/)]),
    city : new FormControl ('' , (Validators.required))
  })

  orderService = inject(OrderService)
  responseErrorMessage = ''

  resirectUserToPayment (url : string){
    window.location.href = url
  }

  onlinePayment(){

    this.checkOutSubscribtion =
    this.orderService.checkOut(this.shippingAddressForm.value , this.id).subscribe({

      next : (Response)=>{console.log(Response)
        this.resirectUserToPayment(Response.session.url)
      },
      error: (err)=>{console.log(err)}
    })
  }

  ngOnDestroy(): void {
    this.checkOutSubscribtion?.unsubscribe()
  }
}
