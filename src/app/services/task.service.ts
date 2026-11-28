import { Injectable, signal } from '@angular/core';
import { Task } from '../task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private state = signal<Task[]>([
    { id: 1, title: 'Lire le cours Angular', completed: false, priority: 'high', dueDate: '2026-11-15' },
    { id: 2, title: 'Installer le CLI', completed: false, priority: 'medium', dueDate: '2026-11-16' },
    { id: 3, title: 'Créer TaskFlow', completed: false, priority: 'low', dueDate: '2026-11-17' }
  ]);
  readonly tasks = this.state.asReadonly();

  private counter = 4;

  nextId() {
    return this.counter++;
  }

  add(task: Task) {
    this.state.update(items => [...items, task]);
  }

  remove(id: number) {
    this.state.update(items => items.filter(t => t.id !== id));
  }

  update(id: number, changes: Partial<Task>) {
    this.state.update(items =>
      items.map(t => (t.id === id ? { ...t, ...changes } : t))
    );
  }

  complete(id: number) {
    this.update(id, { completed: true });
  }

  clear() {
    this.state.set([]);
  }
}
