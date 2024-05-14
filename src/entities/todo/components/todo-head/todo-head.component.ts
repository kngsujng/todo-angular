import { CommonModule, DatePipe, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/entities/auth/services/auth.service';
import { TodoItem } from '../../models/todo';
import { TodoService } from '../../services/todo.service';
import { User } from 'firebase/auth';

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
  currentUser$: Observable<User | null> = this.authService.getUserInfo();
  username: string | null | undefined

  constructor(
    public todoService: TodoService,
    private authService: AuthService,
    private router: Router,
  ) {
      this.currentUser$.subscribe(user => {
      this.username = user?.displayName;
    })
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

  onLogout(){
    this.authService.logoutUser();
    this.router.navigateByUrl('/login')
  }
}
