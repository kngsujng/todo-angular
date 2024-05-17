import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CopyTodoComponent } from 'src/features';
import { RemoveTodoComponent } from 'src/features/todo/components/remove-todo/remove-todo.component';
import { ToggleStatusComponent } from 'src/features/todo/components/toggle-status';
import { TodoItemComponent } from '../../entities/todo/components/todo-item/todo-item.component';
import { TodoItem } from '../../entities/todo/models/todo';
import { TodoService } from '../../entities/todo/services/todo.service';
import { SortTodoComponent } from '../../features/todo/components/sort-todo/sort-todo.component';
import { EditTodoComponent } from 'src/features/todo/components/edit-todo';

@Component({
  selector: 'todo-list-widget',
  standalone: true,
  imports: [TodoItemComponent, CommonModule, SortTodoComponent, RemoveTodoComponent, CopyTodoComponent, ToggleStatusComponent, EditTodoComponent],
  templateUrl: './todo-list.widget.html',
  styleUrl: './todo-list.widget.scss',
})
export class TodoListWidget {
  
  allTodoList$!: Observable<TodoItem[]>;

  constructor(private todoService: TodoService) {
    this.allTodoList$ = this.todoService.todoListState$;
  }

}
