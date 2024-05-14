import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { TodoApi } from '../api';
import { TodoItem, TodoStatus } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly todoApi = inject(TodoApi);
  private todoListState = new BehaviorSubject<TodoItem[]>([]);
  
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
    this.todoApi.addTodo('test', todo, location) // TODO 사용자이름 임의로 가져오지 말고 로그인한 사용자 정보에서 가져오기
    .pipe(
      tap(result => {
        this.todoListState.value.push(result);
      })
    ).subscribe();
  }

  onDeleteTodo(todoId: string) {
    // TODO 사용자이름 임의로 가져오지 말고 로그인한 사용자 정보에서 가져오기
    this.todoApi.deleteTodo('test', todoId)
    const removedTodos = this.todoListState.value.filter((todo) => todo.id !== todoId);
    this.todoListState.next(removedTodos);
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
