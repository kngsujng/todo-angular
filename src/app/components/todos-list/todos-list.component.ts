import { Component } from '@angular/core';
import { TodoComponent } from '../todo/todo.component';
import { TodoService } from '../../services/todo.service';
import { Observable } from 'rxjs';
import { TodoItem, TodoStatus } from '../../model/todo';
import { CommonModule } from '@angular/common';
import { SortTodoComponent } from '../sort-todo/sort-todo.component';

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [TodoComponent, CommonModule, SortTodoComponent],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
})
export class TodosListComponent {
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
