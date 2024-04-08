import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { TodoHeadComponent } from './components/todo-head/todo-head.component';
import { TodoListService } from './share/todo-list.service';
import { SortTodoComponent } from './components/sort-todo/sort-todo.component';

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
  constructor(public todos: TodoListService) {}
}
