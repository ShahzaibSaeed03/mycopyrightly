import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../../enviroments/enviroment';
import { FormsModule } from '@angular/forms';
import { PaymentStatusComponent } from '../payment-status/payment-status.component';
import { StripeService } from '../../services/stripe.service';

@Component({
  selector: 'app-buy-tokens',
  standalone: true,
  imports: [HeaderComponent, DropdownModule, ReactiveFormsModule, FormsModule, PaymentStatusComponent],
  templateUrl: './buy-tokens.component.html',
  styleUrl: './buy-tokens.component.css'
})
export class BuyTokensComponent {

  stripe: any;
  stripeKey = environment.stripePublishAbleKey;
  number: number = 5;
  numbers: any = Array.from({ length: 96 }, (_, i) => ({ value: i + 5 }));
  checkoutInstance: any | null = null;

  constructor(private _stripeSrevice: StripeService) { }

  ngOnInit() {
    this.initialize()
  }

  onChange() {
    this.checkoutInstance.destroy();
    this.initialize();
  }

  async initialize() {
    await loadStripe(this.stripeKey).then((stripeInstance) => {
      this.stripe = stripeInstance;
    });

    this._stripeSrevice.getClientSecret(this.number).subscribe((data: any) => {   
      this.stripe.initEmbeddedCheckout(data)
        .then((checkout: any) => {    
            this.checkoutInstance = checkout;
            checkout.mount('#checkout');
          })
    })
  }
}
