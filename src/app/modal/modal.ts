import { Component, model } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.html',
  styleUrl: './modal.css'
})
export class Modal {
  isOpen = model(false); // compatible avec [(isOpen)]

  close() {
    this.isOpen.set(false);
  }
}