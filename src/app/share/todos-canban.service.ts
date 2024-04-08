import { Injectable } from '@angular/core';
import { TodoListService } from './todo-list.service';
import { TodoItem } from '../model/todo';

@Injectable({
  providedIn: 'root',
})
export class TodosCanbanService {
  constructor(public todos: TodoListService) {}

  canbanToDo = this.todos.todoList.filter((todoItem) => !todoItem.isCompleted);
  canbanInProgress: TodoItem[] = [];
  canbanCompleted = this.todos.todoList.filter(
    (todoItem) => todoItem.isCompleted,
  );
}
