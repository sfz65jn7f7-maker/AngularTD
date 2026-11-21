import { Component, computed, signal } from '@angular/core';
import { Task } from '../task.model';

@Component({
  selector: 'app-signal-demo',
  templateUrl: './signal-demo.html',
  styleUrl: './signal-demo.css'
})
export class SignalDemo {
  counter = signal(0);
  double = computed(() => this.counter() * 2);
  parity = computed(() => (this.counter() % 2 === 0 ? 'pair' : 'impair'));

  increment() {
    this.counter.update(n => n + 1);
  }
  decrement() {
    this.counter.update(n => n - 1);
  }
  reset() {
    this.counter.set(0);
  }

  fruits = signal<string[]>(['Pomme', 'Banane']);
  fruitCount = computed(() => this.fruits().length);

  addFruit() {
    this.fruits.update(list => [...list, 'Fruit ' + (list.length + 1)]);
  }
  clearFruits() {
    this.fruits.set([]);
  }

  trapList = signal<string[]>(['A', 'B']);
  trapCount = computed(() => this.trapList().length);
  realLength = signal(2);

  badPush() {
    this.trapList().push('X'); 
    this.realLength.set(this.trapList().length);
  }
  goodAdd() {
    this.trapList.update(list => [...list, 'Y']); 
    this.realLength.set(this.trapList().length);
  }
  resetTrap() {
    this.trapList.set(['A', 'B']);
    this.realLength.set(2);
  }

  tasks = signal<Task[]>([]);                              
  taskCount = computed(() => this.tasks().length);         
  private nextTaskId = 1;

  addTask() {
    const id = this.nextTaskId++;
    this.tasks.update(items => [                           
      ...items,
      { id, title: 'Tâche ' + id, completed: false, priority: 'medium' }
    ]);
  }

  clearTasks() {
    this.tasks.set([]);                                    
  }
}