import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
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
  
  allTodoList$!: Observable<TodoItem[]>;

  constructor(private todoService: TodoService) {
    this.allTodoList$ = this.todoService.todoListState$;
  }

  onChangeStatus(id: string, status: TodoStatus) {
    this.todoService.onChangeStatus(id, status);
  }

  onEditTodo(id: string, updatedContent: string) {
    this.todoService.onEditTodo(id, updatedContent);
  }
}
