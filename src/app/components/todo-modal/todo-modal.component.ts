import { Component, Inject } from '@angular/core';
import { TodoItem } from 'src/app/model/todo';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-todo-modal',
  standalone: true,
  imports: [],
  templateUrl: './todo-modal.component.html',
  styleUrl: './todo-modal.component.scss'
})

export class TodoModalComponent {
  constructor(
    public dialogRef: DialogRef<TodoItem>,
    @Inject(DIALOG_DATA) public data: TodoItem
  ) {
  }
}
