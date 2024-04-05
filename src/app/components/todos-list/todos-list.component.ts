import { Component, EventEmitter, Output } from '@angular/core';
import { TodoListService } from '../../share/todo-list.service';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [TodoComponent],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
})
export class TodosListComponent {
  constructor(public todos: TodoListService) {}
}
