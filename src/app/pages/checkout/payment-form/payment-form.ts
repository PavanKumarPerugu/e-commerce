import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { ViewPanel } from '../../../directives/view-panel';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';

@Component({
  selector: 'app-payment-form',
  imports: [ViewPanel, MatIcon, MatRadioGroup, MatRadioButton],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.scss',
})
export class PaymentForm {}
