import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../task.model';
import { Modal } from '../modal/modal';
import { TaskCard } from '../task-card/task-card';

@Component({
  selector: 'app-task-list',
  imports: [FormsModule, Modal, TaskCard],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
  query = signal('');
  showModal = signal(false);

  // pour la modification
  editingId = signal<number | null>(null);
  editTitle = signal('');
  editPriority = signal<Task['priority']>('medium');

  tasks = signal<Task[]>([
    { id: 1, title: 'Lire le cours Angular', completed: false, priority: 'high', dueDate: '2026-11-15' },
    { id: 2, title: 'Installer le CLI', completed: false, priority: 'medium', dueDate: '2026-11-16' },
    { id: 3, title: 'Créer TaskFlow', completed: false, priority: 'low', dueDate: '2026-11-17' }
  ]);

  count = computed(() => this.tasks().length);
  filteredTasks = computed(() =>
    this.tasks().filter(t =>
      t.title.toLowerCase().includes(this.query().toLowerCase())
    )
  );

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

  onCompleted(id: number) {
    this.tasks.update(items =>
      items.map(t => (t.id === id ? { ...t, completed: true } : t))
    );
  }

  remove(id: number) {
    this.tasks.update(items => items.filter(t => t.id !== id));
  }

  startEdit(task: Task) {
    this.editingId.set(task.id);
    this.editTitle.set(task.title);
    this.editPriority.set(task.priority);
  }

  saveEdit() {
    const id = this.editingId();
    const title = this.editTitle().trim();
    if (id === null || title === '') return;

    this.tasks.update(items =>
      items.map(t =>
        t.id === id ? { ...t, title: title, priority: this.editPriority() } : t
      )
    );
    this.editingId.set(null);
  }

  // MODIFIER : annuler
  cancelEdit() {
    this.editingId.set(null);
  }
}