import { Component, inject } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  title = 'TaskFlow';
  canDelete = false;
  cart = inject(CartService);

  rename() {
    this.title = 'Mes tâches';
  }
}
