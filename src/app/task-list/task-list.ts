import { Component, computed, signal } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-list',
  imports: [DatePipe, UpperCasePipe],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
  tasks = signal<Task[]>([
    { id: 1, title: 'Lire le cours Angular', completed: false, priority: 'high', dueDate: '2026-11-15' },
    { id: 2, title: 'Installer le CLI', completed: false, priority: 'medium', dueDate: '2026-11-16' },
    { id: 3, title: 'Créer TaskFlow', completed: false, priority: 'low', dueDate: '2026-11-17' }
  ]);

  count = computed(() => this.tasks().length);

  private nextId = 4;

  add(task: Task) {
    this.tasks.update(items => [...items, task]);
  }

  addSample() {
    this.add({
      id: this.nextId++,
      title: `Nouvelle tâche ${this.nextId - 1}`,
      completed: false,
      priority: 'medium'
    });
  }

  clear() {
    this.tasks.set([]);
  }
}