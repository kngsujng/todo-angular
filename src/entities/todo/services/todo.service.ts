import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { TodoApi } from '../api';
import { TodoItem, TodoStatus } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly todoApi = inject(TodoApi);
  private readonly todoListState = new BehaviorSubject<TodoItem[]>([]);
  
  constructor() {}

  getAllTodoList() {
    return this.todoApi.getTodos('test').pipe(
      tap(todos => this.todoListState.next(todos))
    )
  }

  getTodoList(status: TodoStatus) {
    return this.todoListState.pipe(
      map((todoList) => todoList.filter((todo) => todo.status === status)),
    );
  }

  onAddTodo(todo: string, location: string) {
    if (todo.trim().length <= 0) return;
    // addTodo(this.authService.loggedUser().name, todo, location)
  }

  onDeleteTodo(id: string) {
    const removedTodos = this.todoListState.value.filter(
      (item) => item.id !== id,
    );
    this.todoListState.next(removedTodos);
    // deleteTodo(this.authService.loggedUser().name, id)
  }

  onChangeStatus(id: string, status: TodoStatus) {
    const changeStatusTodos = this.todoListState.value.map<TodoItem>((todo) => {
      if (todo.id !== id) return todo;
      const notCompletedStatus = status === 'TODO' || status === 'INPROGRESS'
      if (notCompletedStatus) {
        return { ...todo, status: 'COMPLETED' };
      }
      return { ...todo, status: 'TODO' };
    })
    this.todoListState.next(changeStatusTodos);
  }

  onEditTodo(id: string, updatedContent: string) {
    const updatedTodos = this.todoListState.value.map((todo) => {
      if (todo.id !== id) return todo;
      return { ...todo, content: updatedContent };
    });
    this.todoListState.next(updatedTodos);
  }
}
