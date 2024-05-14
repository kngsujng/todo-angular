import { Component } from '@angular/core';
import { TodoItemComponent } from '../../entities/todo/components/todo-item/todo-item.component';
import { TodoService } from '../../entities/todo/services/todo.service';
import { Observable } from 'rxjs';
import { TodoItem, TodoStatus } from '../../entities/todo/models/todo';
import { CommonModule } from '@angular/common';
import { SortTodoComponent } from '../../features/todo/components/sort-todo/sort-todo.component';
import { RemoveTodoComponent } from 'src/features/todo/components/remove-todo/remove-todo.component';

@Component({
  selector: 'todo-list-widget',
  standalone: true,
  imports: [TodoItemComponent, CommonModule, SortTodoComponent, RemoveTodoComponent],
  templateUrl: './todo-list.widget.html',
  styleUrl: './todo-list.widget.scss',
})
export class TodoListWidget {
  allTodoList$: Observable<TodoItem[]> = this.todoService.getAllTodoList();

  constructor(private readonly todoService: TodoService) {}

  onDeleteTodo(id: string) {
    this.todoService.onDeleteTodo(id);
  }

  onChangeStatus(id: string, status: TodoStatus) {
    this.todoService.onChangeStatus(id, status);
  }

  onEditTodo(id: string, updatedContent: string) {
    this.todoService.onEditTodo(id, updatedContent);
  }
}
