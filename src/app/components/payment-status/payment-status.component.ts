import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StripeService } from '../../services/stripe.service';
import { first } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-status.component.html',
  styleUrl: './payment-status.component.css'
})
export class PaymentStatusComponent {

  constructor(private router: Router, private route: ActivatedRoute, private _stripeService: StripeService) { }

  sessionId: string | null = null;
  session: any;

  ngOnInit() {    
    this.route.queryParamMap.pipe(first()).subscribe(params => {
      this.sessionId = params.get('session_id');
    })
    this.initialize()
  }

  async initialize() {
    if (this.sessionId) {
      this.session = this._stripeService.getPaymentStatus(this.sessionId)
        .subscribe(data => data);
    }

    if (this.session.status == 'open') {
      this.router.navigate(['/buy-tokens'])
    }
  }
}
