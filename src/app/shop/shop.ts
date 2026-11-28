import { Component, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-shop',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './shop.html',
  styleUrl: './shop.css'
})
export class Shop {
  cart = inject(CartService);

  name = signal('');
  price = signal<number | null>(null);
  message = signal('');

  create() {
    const name = this.name().trim();
    const price = this.price();

    if (name === '' || price === null || price <= 0) {
      this.message.set('Remplis un nom et un prix valide.');
      return;
    }

    this.cart.createProduct(name, price);
    this.name.set('');
    this.price.set(null);
    this.message.set('');
  }
}
