import { Component } from '@angular/core';
import { TodosComponent } from '../todos/todos.component';
import { TodoListService } from '../../share/todo-list.service';

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [TodosComponent],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
})
export class TodosListComponent {
  constructor(public todos: TodoListService) {}

  onRemoveTodo(id: string) {
    this.todos.onRemoveTodo(id);
    console.table(this.todos);
  }
  onToggleTodo(id: string) {
    this.todos.onToggleTodo(id);
    console.table(this.todos);
  }
  onEditTodo(id: string, updatedTodo: string) {
    this.todos.onEditTodo(id, updatedTodo);
  }
}
