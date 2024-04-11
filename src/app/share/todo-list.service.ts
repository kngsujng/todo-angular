import { Injectable } from '@angular/core';
import { TodoItem } from '../model/todo';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  constructor() {}

  todoList: TodoItem[] = [
    {
      id: '1',
      todo: '밥먹기',
      isCompleted: true,
      createdAt: new Date('December 18, 1995 03:24:00'),
    },
    {
      id: '2',
      todo: '운동가기',
      isCompleted: true,
      createdAt: new Date('December 21, 1995 03:24:00'),
    },
    {
      id: '3',
      todo: '일하러 가기',
      isCompleted: false,
      createdAt: new Date('November 17, 1995 03:24:00'),
    },
    {
      id: '4',
      todo: '동해물과 백두산이 마르고 닳도록 하나님이 보우하사 우리 나라 만세',
      isCompleted: false,
      createdAt: new Date('March 17, 1995 03:24:00'),
    },
    {
      id: '5',
      todo: '123',
      isCompleted: false,
      createdAt: new Date('March 17, 2000 03:24:00'),
    },
    {
      id: '6',
      todo: '동해물과 백두산이 마르고 닳도록 하나님이 보우하사 우리 나라 만세 동해물과 백두산이 마르고 닳도록 하나님이 보우하사 우리 나라 만세',
      isCompleted: false,
      createdAt: new Date('March 12, 2000 03:24:00'),
    },
    {
      id: '7',
      todo: '밥먹기',
      isCompleted: false,
      createdAt: new Date('February 17, 2000 03:24:00'),
    },
    {
      id: '8',
      todo: '운동가기',
      isCompleted: false,
      createdAt: new Date('February 17, 2001 03:24:00'),
    },
    {
      id: '9',
      todo: '일하러 가기',
      isCompleted: false,
      createdAt: new Date('April 17, 2000 03:24:00'),
    },
    {
      id: '10',
      todo: '동해물과 백두산이 마르고 닳도록 하나님이 보우하사 우리 나라 만세',
      isCompleted: false,
      createdAt: new Date('April 21, 2020 03:24:00'),
    },
    {
      id: '11',
      todo: '123',
      isCompleted: false,
      createdAt: new Date('April 24, 2020 03:24:00'),
    },
    {
      id: '12',
      todo: '동해물과 백두산이 마르고 닳도록 하나님이 보우하사 우리 나라 만세 동해물과 백두산이 마르고 닳도록 하나님이 보우하사 우리 나라 만세',
      isCompleted: false,
      createdAt: new Date('April 8, 2024 03:24:00'),
    },
  ];

  onAddTodo(todo: string) {
    if (todo.trim().length > 0) {
      this.todoList = [
        {
          id: uuid(),
          todo: todo,
          isCompleted: false,
          createdAt: new Date(),
        },
        ...this.todoList,
      ];
      console.table(this.todoList);
    }
  }
  onRemoveTodo(id: string) {
    this.todoList = this.todoList.filter((item) => item.id !== id);
    console.table(this.todoList);
  }
  onToggleTodo(id: string) {
    for (let todoItem of this.todoList) {
      if (todoItem.id === id) {
        todoItem.isCompleted = !todoItem.isCompleted;
        break;
      }
    }
    console.table(this.todoList);
  }
  onEditTodo(id: string, updatedTodo: string) {
    const todoIndex = this.todoList.findIndex((item) => item.id === id);
    this.todoList[todoIndex].todo = updatedTodo;
    console.table(this.todoList);
  }

  onSortTodo(criteria: string) {
    console.log(criteria);
    if (criteria === '최신순') {
      this.todoList.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      console.table(this.todoList);
    }
    if (criteria === '등록순') {
      this.todoList.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
      console.table(this.todoList);
    }
    if (criteria === '가나다순') {
      this.todoList.sort((a, b) => a.todo.localeCompare(b.todo));
      console.table(this.todoList);
    }
  }
}
