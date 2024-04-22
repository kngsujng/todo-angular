import { Component } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-todo-modal',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './todo-modal.component.html',
  styleUrl: './todo-modal.component.scss',
})
export class TodoModalComponent {
  constructor(private modalService: ModalService) {}
}
