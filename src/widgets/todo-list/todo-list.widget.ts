import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { RemoveTodoComponent } from 'src/features/todo/components/remove-todo/remove-todo.component';
import { TodoItemComponent } from '../../entities/todo/components/todo-item/todo-item.component';
import { TodoItem, TodoStatus } from '../../entities/todo/models/todo';
import { TodoService } from '../../entities/todo/services/todo.service';
import { SortTodoComponent } from '../../features/todo/components/sort-todo/sort-todo.component';

@Component({
  selector: 'todo-list-widget',
  standalone: true,
  imports: [TodoItemComponent, CommonModule, SortTodoComponent, RemoveTodoComponent],
  templateUrl: './todo-list.widget.html',
  styleUrl: './todo-list.widget.scss',
})
export class TodoListWidget {
  allTodoList !: TodoItem[];

  constructor(private todoService: TodoService) {
    this.todoService.getAllTodoList().pipe(
      tap(todos => this.allTodoList = todos)
    ).subscribe()
  }

  onChangeStatus(id: string, status: TodoStatus) {
    this.todoService.onChangeStatus(id, status);
  }

  onEditTodo(id: string, updatedContent: string) {
    this.todoService.onEditTodo(id, updatedContent);
  }
}
