import { Component } from '@angular/core';
import { TodosListComponent } from '../todos-list/todos-list.component';
import { TodosCanbanService } from '../../share/todos-canban.service';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-todos-canban',
  standalone: true,
  imports: [TodosListComponent, TodoComponent],
  templateUrl: './todos-canban.component.html',
  styleUrl: './todos-canban.component.scss',
})
export class TodosCanbanComponent {
  constructor(public canbanTodos: TodosCanbanService) {}
}
