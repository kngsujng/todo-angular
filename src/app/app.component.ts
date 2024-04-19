import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { TodoHeadComponent } from './components/todo-head/todo-head.component';
import { SortTodoComponent } from './components/sort-todo/sort-todo.component';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AddTodoComponent,
    TodoHeadComponent,
    SortTodoComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    private todoService: TodoService,
    public router: Router,
  ) {}

  onAddTodo(newTodo: string, location: string) {
    this.todoService.onAddTodo(newTodo, location);
  }
}
