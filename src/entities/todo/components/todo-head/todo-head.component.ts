import { CommonModule, DatePipe, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ProfileState } from 'src/entities/auth';
import { TodoItem } from '../../models/todo';
import { TodoService } from '../../services/todo.service';

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
  allTodoList$ !: Observable<TodoItem[]>;
  username: string | null | undefined;

  constructor(
    public todoService: TodoService,
    private profileState : ProfileState,
  ) {
    this.username = this.profileState.getUsername();
    this.allTodoList$ = this.todoService.todoListState$;
  }

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
