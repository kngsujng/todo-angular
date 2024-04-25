import { Component, Inject } from '@angular/core';
import { TodoItem } from 'src/app/model/todo';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-todo-modal',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './todo-modal.component.html',
  styleUrl: './todo-modal.component.scss',
})

export class TodoModalComponent {

  constructor(
    private dialogRef: DialogRef<TodoItem>,
    @Inject(DIALOG_DATA) public data: TodoItem
  ) {}
  
  closeModal(){
    this.dialogRef.close()
  }
}
