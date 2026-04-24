import { Component, inject } from '@angular/core';
import { BackButton } from "../../components/back-button/back-button";
import { SummarizeOrder } from "../../components/summarize-order/summarize-order";
import { PaymentForm } from './payment-form/payment-form';
import { ShippingForm } from './shipping-form/shipping-form';
import { ɵEmptyOutletComponent } from "@angular/router";
import { ECommerceStore } from '../../e-commerce-store';
import { MatAnchor, MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-checkout',
  imports: [BackButton, SummarizeOrder, PaymentForm, ShippingForm, ɵEmptyOutletComponent, MatAnchor, MatButtonModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export default class Checkout {
  store = inject(ECommerceStore);
}
