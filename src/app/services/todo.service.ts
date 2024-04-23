import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { TodoItem, TodoStatus } from '../model/todo';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly todoListState = new BehaviorSubject<TodoItem[]>([
    {
      id: '1',
      content: '밥먹기',
      status: 'COMPLETED',
      createdAt: new Date('March 5, 2024 03:24:00'),
      location: '광주 동구 문화전당로26번길 7',
    },
    {
      id: '2',
      content: '운동가기',
      status: 'COMPLETED',
      createdAt: new Date('December 21, 2023 03:24:00'),
      location: '광주광역시 북구 용봉로 77',
    },
    {
      id: '3',
      content: '일하러 가기',
      status: 'TODO',
      createdAt: new Date('November 17, 1995 03:24:00'),
      location: '광주 북구 무등로 235',
    },
    {
      id: '4',
      content:
        '동해물과 백두산이 마르고 닳도록 하나님이 보우하사 우리 나라 만세',
      status: 'INPROGRESS',
      createdAt: new Date('March 17, 1995 03:24:00'),
      location: '광주 동구 증심사길30번길 15',
    },
    {
      id: '5',
      content: '123',
      status: 'TODO',
      createdAt: new Date('March 17, 2000 03:24:00'),
      location: '전남 나주시 상야4길 16-16',
    },
    {
      id: '6',
      content:
        '동해물과 백두산이 마르고 닳도록 하나님이 보우하사 우리 나라 만세 동해물과 백두산이 마르고 닳도록 하나님이 보우하사 우리 나라 만세',
      status: 'INPROGRESS',
      createdAt: new Date('March 12, 2000 03:24:00'),
    },
    {
      id: '7',
      content: '밥먹기',
      status: 'TODO',
      createdAt: new Date('February 17, 2000 03:24:00'),
    },
    {
      id: '8',
      content: '운동가기',
      status: 'INPROGRESS',
      createdAt: new Date('February 17, 2001 03:24:00'),
    },
    {
      id: '9',
      content: '일하러 가기',
      status: 'TODO',
      createdAt: new Date('April 17, 2000 03:24:00'),
    },
    {
      id: '10',
      content:
        '동해물과 백두산이 마르고 닳도록 하나님이 보우하사 우리 나라 만세',
      status: 'TODO',
      createdAt: new Date('April 21, 2020 03:24:00'),
    },
    {
      id: '11',
      content: '123',
      status: 'INPROGRESS',
      createdAt: new Date('April 24, 2020 03:24:00'),
    },
    {
      id: '12',
      content:
        '동해물과 백두산이 마르고 닳도록 하나님이 보우하사 우리 나라 만세 동해물과 백두산이 마르고 닳도록 하나님이 보우하사 우리 나라 만세',
      status: 'TODO',
      createdAt: new Date('April 8, 2024 03:24:00'),
    },
  ]);
  // 클래스 외부에서 수정 못 하는 원본 초기 상태값
  // 상태변경은 오직 todoListState에 대한 접근 권한을 가진 클래스 내부의 메서드를 통해서만 가능

  // todoList$ 'todoListState' BehaviorSubject의 observable을 반환
  // 위 원본 상태값을 변화시키기 위한 상태값
  // 클래스 외부에서는 todoList$를 통해 TodoItem[] 배열의 현재 상태를 구독만 가능, 배열 직접 변경/값 변경 불가

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
      return { ...todo, todo: updatedContent };
    });
    this.todoListState.next(updatedTodos);
  }

  onSortTodo(criteria: string) {
    if (criteria === '최신순') {
      const sortedTodos = this.todoListState.value.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      this.todoListState.next(sortedTodos);
    }
    if (criteria === '등록순') {
      const sortedTodos = this.todoListState.value.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
      this.todoListState.next(sortedTodos);
    }
    if (criteria === '가나다순') {
      const sortedTodos = this.todoListState.value.sort((a, b) =>
        a.content.localeCompare(b.content),
      );
      this.todoListState.next(sortedTodos);
    }
  }
}
