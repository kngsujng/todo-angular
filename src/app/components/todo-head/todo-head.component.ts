import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TodoListService } from '../../share/todo-list.service';

@Component({
  selector: 'app-todo-head',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, DatePipe],
  templateUrl: './todo-head.component.html',
  styleUrl: './todo-head.component.scss',
})
export class TodoHeadComponent {
  today: Date = new Date();
  constructor(public todos: TodoListService) {}

  getCompletionRate(): number {
    const completionRate =
      this.todos.todoList.filter((item) => item.isCompleted).length /
      this.todos.todoList.length;
    return Math.round(completionRate * 100);
  }
}
