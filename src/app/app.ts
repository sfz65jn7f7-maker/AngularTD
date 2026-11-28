import { Component, inject, signal } from '@angular/core';
import { Header } from './header/header';
import { TaskList } from './task-list/task-list';
import { SignalDemo } from './signal-demo/signal-demo';
import { Shop } from './shop/shop';
import { Cart } from './cart/cart';
import { CartService } from './services/cart.service';

@Component({
  imports: [Header, TaskList, SignalDemo, Shop, Cart],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('my-project');
  cart = inject(CartService);
  page = signal<'tasks' | 'shop' | 'cart' | 'demo'>('tasks');
}
