import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { OrderBy, TodoItem, TodoStatus } from '../model/todo';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly todoListState = new BehaviorSubject<TodoItem[]>([
    {
      id: '1',
      todo: '밥먹기',
      status: 'COMPLETED',
      createdAt: new Date('December 18, 1995 03:24:00'),
    },
    {
      id: '2',
      todo: '운동가기',
      status: 'COMPLETED',
      createdAt: new Date('December 21, 1995 03:24:00'),
    },
    {
      id: '3',
      todo: '일하러 가기',
      status: 'TODO',
      createdAt: new Date('November 17, 1995 03:24:00'),
    },
    {
      id: '4',
      todo: '동해물과 백두산이 마르고 닳도록 하나님이 보우하사 우리 나라 만세',
      status: 'INPROGRESS',
      createdAt: new Date('March 17, 1995 03:24:00'),
    },
    {
      id: '5',
      todo: '123',
      status: 'TODO',
      createdAt: new Date('March 17, 2000 03:24:00'),
    },
    {
      id: '6',
      todo: '동해물과 백두산이 마르고 닳도록 하나님이 보우하사 우리 나라 만세 동해물과 백두산이 마르고 닳도록 하나님이 보우하사 우리 나라 만세',
      status: 'INPROGRESS',
      createdAt: new Date('March 12, 2000 03:24:00'),
    },
    {
      id: '7',
      todo: '밥먹기',
      status: 'TODO',
      createdAt: new Date('February 17, 2000 03:24:00'),
    },
    {
      id: '8',
      todo: '운동가기',
      status: 'INPROGRESS',
      createdAt: new Date('February 17, 2001 03:24:00'),
    },
    {
      id: '9',
      todo: '일하러 가기',
      status: 'TODO',
      createdAt: new Date('April 17, 2000 03:24:00'),
    },
    {
      id: '10',
      todo: '동해물과 백두산이 마르고 닳도록 하나님이 보우하사 우리 나라 만세',
      status: 'TODO',
      createdAt: new Date('April 21, 2020 03:24:00'),
    },
    {
      id: '11',
      todo: '123',
      status: 'INPROGRESS',
      createdAt: new Date('April 24, 2020 03:24:00'),
    },
    {
      id: '12',
      todo: '동해물과 백두산이 마르고 닳도록 하나님이 보우하사 우리 나라 만세 동해물과 백두산이 마르고 닳도록 하나님이 보우하사 우리 나라 만세',
      status: 'TODO',
      createdAt: new Date('April 8, 2024 03:24:00'),
    },
  ]);
  // 클래스 외부에서 수정 못 하는 원본 초기 상태값
  // 상태변경은 오직 todoListState에 대한 접근 권한을 가진 클래스 내부의 메서드를 통해서만 가능

  readonly todoList$ = this.todoListState.asObservable();
  // todoList$는 'todoListState' BehaviorSubject의 observable을 반환
  // 위 원본 상태값을 변화시키기 위한 상태값
  // 클래스 외부에서는 todoList$를 통해 TodoItem[] 배열의 현재 상태를 구독만 가능, 배열 직접 변경/값 변경 불가

  getAllTodoList() {
    return this.todoList$;
  }

  getTodoTodoList() {
    return this.todoList$.pipe(
      map((todoList) => todoList.filter((todo) => todo.status === 'TODO')),
    );
  }

  getInProgressTodoList() {
    return this.todoList$.pipe(
      map((todoList) =>
        todoList.filter((todo) => todo.status === 'INPROGRESS'),
      ),
    );
  }

  getCompletedTodoList() {
    return this.todoList$.pipe(
      map((todoList) => todoList.filter((todo) => todo.status === 'COMPLETED')),
    );
  }

  onAddTodo(todo: string) {
    if (todo.trim().length > 0) {
      this.todoListState.next([
        {
          id: uuid(),
          todo: todo,
          status: 'TODO',
          createdAt: new Date(),
        },
        ...this.todoListState.value,
      ]);
    }
  }

  onRemoveTodo(id: string) {
    const removedTodos = this.todoListState.value.filter(
      (item) => item.id !== id,
    );
    this.todoListState.next(removedTodos);
  }

  onChangeStatus(id: string, status: TodoStatus) {
    const changeStatusTodos = this.todoListState.value.map((todo) => {
      if (todo.id !== id) return todo;
      else {
        if (status === 'TODO' || status === 'INPROGRESS') {
          return { ...todo, status: 'COMPLETED' };
        } else {
          return { ...todo, status: 'TODO' };
        }
      }
    }) as TodoItem[];
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
    // if (criteria === '최신순') {
    //   this.todoList.sort(
    //     (a, b) =>
    //       new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    //   );
    // }
    // if (criteria === '등록순') {
    //   this.todoList.sort(
    //     (a, b) =>
    //       new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    //   );
    // }
    // if (criteria === '가나다순') {
    //   this.todoList.sort((a, b) => a.todo.localeCompare(b.todo));
    // }
  }
}
