import { Injectable } from '@angular/core';
import { TodoListService } from './todo-list.service';
import { TodoItem } from '../model/todo';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class TodosCanbanService {
  constructor(public listTodos: TodoListService) {}

  canbanToDoArr = this.listTodos.todoList.filter(
    (todoItem) => !todoItem.isCompleted,
  );
  canbanInProgressArr: TodoItem[] = [];
  canbanCompletedArr = this.listTodos.todoList.filter(
    (todoItem) => todoItem.isCompleted,
  );

  onAddTodo(todo: string) {
    if (todo.trim().length > 0) {
      this.canbanToDoArr = [
        {
          id: uuid(),
          todo: todo,
          isCompleted: false,
          createdAt: new Date(),
        },
        ...this.canbanToDoArr,
      ];
      console.log(this.listTodos.todoList);
    }
  }

  // TODO todoList와 canbanToDoArr, canbanCompletedArr 동시에 지우는 작업 수정해야 함
  onRemoveTodo(id: string) {
    this.listTodos.todoList = this.listTodos.todoList.filter(
      (item) => item.id !== id,
    );
    this.canbanToDoArr = this.canbanToDoArr.filter((item) => item.id !== id);
    this.canbanInProgressArr = this.canbanInProgressArr.filter(
      (item) => item.id !== id,
    );
    this.canbanCompletedArr = this.canbanCompletedArr.filter(
      (item) => item.id !== id,
    );
  }

  onToggleStatus(id: string, isCompleted: boolean) {
    for (let todoItem of this.listTodos.todoList) {
      if (todoItem.id === id) {
        todoItem.isCompleted = !isCompleted;
        if (todoItem.isCompleted) {
          this.canbanCompletedArr = [todoItem, ...this.canbanCompletedArr];
          this.canbanToDoArr = this.canbanToDoArr.filter(
            (item) => item.id !== id,
          );
          this.canbanInProgressArr = this.canbanInProgressArr.filter(
            (item) => item.id !== id,
          );
        } else {
          this.canbanToDoArr = [todoItem, ...this.canbanToDoArr];
          this.canbanCompletedArr = this.canbanCompletedArr.filter(
            (item) => item.id !== id,
          );
        }
      }
    }
  }

  onEditTodo(id: string, updatedTodo: string) {
    const todoIndex = this.listTodos.todoList.findIndex(
      (item) => item.id === id,
    );
    this.listTodos.todoList[todoIndex].todo = updatedTodo;
  }

  onSortTodo(criteria: string) {
    if (criteria === '최신순') {
      this.canbanToDoArr.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      this.canbanCompletedArr.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }
    if (criteria === '등록순') {
      this.canbanToDoArr.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
      this.canbanCompletedArr.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    }
    if (criteria === '가나다순') {
      this.canbanToDoArr.sort((a, b) => a.todo.localeCompare(b.todo));
      this.canbanCompletedArr.sort((a, b) => a.todo.localeCompare(b.todo));
    }
  }
}
