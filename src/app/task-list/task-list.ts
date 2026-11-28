import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../task.model';
import { Modal } from '../modal/modal';
import { TaskCard } from '../task-card/task-card';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-list',
  imports: [FormsModule, Modal, TaskCard],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
  private taskService = inject(TaskService);

  query = signal('');
  showModal = signal(false);

  // pour la modification
  editingId = signal<number | null>(null);
  editTitle = signal('');
  editPriority = signal<Task['priority']>('medium');

  // la liste vient du service
  tasks = this.taskService.tasks;
  count = computed(() => this.tasks().length);

  filteredTasks = computed(() =>
    this.tasks().filter(t =>
      t.title.toLowerCase().includes(this.query().toLowerCase())
    )
  );

  addSample() {
    const id = this.taskService.nextId();
    this.taskService.add({
      id,
      title: `Nouvelle tâche ${id}`,
      completed: false,
      priority: 'medium'
    });
  }

  clear() {
    this.taskService.clear();
  }

  remove(id: number) {
    this.taskService.remove(id);
  }

  onCompleted(id: number) {
    this.taskService.complete(id);
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

    this.taskService.update(id, { title, priority: this.editPriority() });
    this.editingId.set(null);
  }

  cancelEdit() {
    this.editingId.set(null);
  }
}
