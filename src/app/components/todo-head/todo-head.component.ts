import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { Observable, map } from 'rxjs';
import { TodoItem } from '../../model/todo';
import { LocationStrategy,PathLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-todo-head',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, DatePipe, CommonModule],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ],
  templateUrl: './todo-head.component.html',
  styleUrl: './todo-head.component.scss',
})
export class TodoHeadComponent {
  today: Date = new Date();
  allTodoList$: Observable<TodoItem[]> = this.todoService.getAllTodoList();

  constructor(
    public todoService: TodoService,
  ) {}

  getCompletionRate(): Observable<number> {
    return this.allTodoList$.pipe(
      map((todoList) => {
        const totalTodos = todoList.length;
        if(totalTodos <= 0) {
          return 0
        };
        const completedTodos = todoList.filter(
          (todo) => todo.status === 'COMPLETED',
        ).length;
        return Math.round((completedTodos / totalTodos) * 100)
          
      }),
    );
  }
}
