import { Component, inject } from '@angular/core';
import { ViewPanel } from "../../directives/view-panel";
import { MatIcon } from "@angular/material/icon";
import { ECommerceStore } from '../../e-commerce-store';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-tease-wishlist',
  imports: [ViewPanel, MatIcon, MatButton, RouterLink],
templateUrl: './tease-wishlist.html',
  styleUrl: './tease-wishlist.scss',
})
export class TeaseWishlist {
  store = inject(ECommerceStore);
}
