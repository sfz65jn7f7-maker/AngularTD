import { Injectable, computed, signal } from '@angular/core';
import { CartItem, Product } from '../product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private productsState = signal<Product[]>([
    { id: 1, name: 'Clavier', price: 25 },
    { id: 2, name: 'Souris', price: 15 },
    { id: 3, name: 'Écran', price: 120 },
    { id: 4, name: 'Casque', price: 40 }
  ]);
  private itemsState = signal<CartItem[]>([]);
  private nextProductId = 5;

  readonly products = this.productsState.asReadonly();
  readonly items = this.itemsState.asReadonly();

  readonly isEmpty = computed(() => this.itemsState().length === 0);
  readonly totalCount = computed(() =>
    this.itemsState().reduce((sum, i) => sum + i.quantity, 0)
  );
  readonly totalPrice = computed(() =>
    this.itemsState().reduce((sum, i) => sum + i.quantity * i.product.price, 0)
  );

  createProduct(name: string, price: number) {
    const product: Product = { id: this.nextProductId++, name, price };
    this.productsState.update(list => [...list, product]);
  }

  addToCart(product: Product) {
    this.itemsState.update(items => {
      const existing = items.find(i => i.product.id === product.id);
      if (existing) {
        return items.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...items, { product, quantity: 1 }];
    });
  }

  removeFromCart(productId: number) {
    this.itemsState.update(items => items.filter(i => i.product.id !== productId));
  }

  clear() {
    this.itemsState.set([]);
  }
}
