import { Component } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';

interface Task {
  id: number;
  title: string;
  dueDate: string;
}

@Component({
  selector: 'app-task-list',
  imports: [DatePipe, UpperCasePipe],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
  tasks: Task[] = [
    { id: 1, title: 'Lire le cours Angular', dueDate: '2026-11-15' },
    { id: 2, title: 'Installer le CLI', dueDate: '2026-11-16' },
    { id: 3, title: 'Créer TaskFlow', dueDate: '2026-11-17' }
  ];

  clear() {
    this.tasks = [];
  }
}