import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { TodoItem, TodoStatus } from '../model/todo';
import { environment } from 'src/environments/environment';
import { v4 as uuid } from 'uuid';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly todoListState = new BehaviorSubject<TodoItem[]>([]);
  
  constructor(private http: HttpClient) {
    this.getDefaultTodoList()
   }

  getDefaultTodoList() {
    return this.http.get<{ todoList: TodoItem[] }>(environment.MOCK_SERVER_URL + '/resource').subscribe(
      (data) => {
        const todos = data.todoList.map(item => {
          return {
            ...item, 
            createdAt: new Date(item.createdAt)
          }
        })
        this.todoListState.next(todos)
      }, 
      (error) => {
        console.error('Failed to fetch default todo List', error)
      }
    )
  }

  getAllTodoList() {
    return this.todoListState;
  }

  getTodoList(status: TodoStatus) {
    return this.todoListState.pipe(
      map((todoList) => todoList.filter((todo) => todo.status === status)),
    );
  }

  onAddTodo(todo: string, location: string) {
    if (todo.trim().length <= 0) return;
    this.todoListState.next([
      {
        id: uuid(),
        content: todo,
        status: 'TODO',
        createdAt: new Date(),
        location,
      },
      ...this.todoListState.value,
    ]);
  }

  onRemoveTodo(id: string) {
    const removedTodos = this.todoListState.value.filter(
      (item) => item.id !== id,
    );
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
