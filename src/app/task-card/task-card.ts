import { Component, input, output } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-card',
  imports: [DatePipe, UpperCasePipe],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css'
})
export class TaskCard {
  task = input.required<Task>();

  completed = output<number>();
  edit = output<void>();
  remove = output<number>();

  markDone() {
    this.completed.emit(this.task().id);
  }
}