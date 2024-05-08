import { Injectable, OnInit, effect } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { TodoItem, TodoStatus } from '../model/todo';
import { addTodo, getTodos, getUser } from 'src/api/firebase';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly todoListState = new BehaviorSubject<TodoItem[]>([]);
  
  constructor(private authService: AuthGuardService) {
    this.getDefaultTodoList();
   }

  getDefaultTodoList() {
    effect(async () => {
      const userName = this.authService.loggedUser().name;
      await getTodos(userName)
        .then((data)=>{
          const todos = data.map(item => {
            return {
              ...item, 
              createdAt: new Date(item.createdAt)
            }
          })
          this.todoListState.next(todos)
        })
    })
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
    addTodo(this.authService.loggedUser().name, todo, location)
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
