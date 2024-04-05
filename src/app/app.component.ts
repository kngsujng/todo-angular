import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { TodoHeadComponent } from './components/todo-head/todo-head.component';
import { TodoListService } from './share/todo-list.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddTodoComponent, TodoHeadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private todoList: TodoListService) {}

  onAddTodo(todo: string) {
    this.todoList.onAddTodo(todo);
  }
}
