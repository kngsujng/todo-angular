import { Component } from '@angular/core';
import { TodoComponent } from '../todo/todo.component';
import { TodoService } from '../../services/todo.service';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
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
  private todoList = new BehaviorSubject<TodoItem[]>([]);
  todoList$: Observable<TodoItem[]> = this.todoList.asObservable();
  criteria = '최신순'

  constructor(private readonly todoService: TodoService) { }

  ngOnInit() {
    this.getTodoList(this.criteria);
  }

  onRemoveTodo(id: string) {
    this.todoService.onRemoveTodo(id);
    this.getTodoList(this.criteria);
  }

  onChangeStatus(id: string, status: TodoStatus) {
    this.todoService.onChangeStatus(id, status);
    this.getTodoList(this.criteria);
  }

  onEditTodo(id: string, updatedContent: string) {
    this.todoService.onEditTodo(id, updatedContent)
    this.getTodoList(this.criteria);
  }

  sortItem(criteria: string) {
    this.criteria = criteria;
    this.getTodoList(this.criteria);
  }

  getTodoList(criteria: string) {
    this.todoService.getAllTodoList().pipe(
      switchMap(() => {
        return of(this.todoService.onSortTodo(criteria))
      })
    ).subscribe(todoList => {
      this.todoList.next(todoList);
    });
  }
}
