import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [DecimalPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  cart = inject(CartService);
}
