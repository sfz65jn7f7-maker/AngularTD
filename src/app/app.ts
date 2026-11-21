import { Component, signal } from '@angular/core';
import { Header } from './header/header';
import { TaskList } from './task-list/task-list';
import { SignalDemo } from './signal-demo/signal-demo';

@Component({
  imports: [Header, TaskList, SignalDemo],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('my-project');
  page = signal<'tasks' | 'demo'>('tasks');
}