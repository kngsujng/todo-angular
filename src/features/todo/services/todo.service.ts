import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { ProfileState } from 'src/entities/auth';
import { TodoApi, TodoItem, TodoState, TodoStatus } from 'src/entities/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly todoApi = inject(TodoApi);
  private readonly profileState = inject(ProfileState);
  private readonly todoState = inject(TodoState);
  private readonly todoListState = new BehaviorSubject<TodoItem[]>([]);
  todoListState$ = this.todoListState.asObservable();
  private readonly username !: string ;

  constructor(){
    this.username = this.profileState.getUsername()
  }
  
  initTodoList() {
    return this.todoApi.getTodos(this.username).pipe(
      tap(todos => {
        this.todoListState.next(todos);
        this.todoState.initByFirebaseTodos(this.todoListState.value);
      })
    )
  }

  getTodoList(status: TodoStatus) {
    return this.todoListState$.pipe(
      map((todoList) => todoList.filter((todo) => todo.status === status)),
    );
  }

  onAddTodo(todo: string, location: string) {
    if (todo.trim().length <= 0) return;
    this.todoApi.addTodo(this.username, todo, location)
    .pipe(
      tap(result => {
        const currentTodos = this.todoListState.value;
        this.todoListState.next([result, ...currentTodos]);
      })
    ).subscribe(() => this.initTodoList());
  }

  onDeleteTodo(todoId: string) {
    this.todoApi.deleteTodo(this.username, todoId).pipe(
      tap(()=> {
        const removedTodos = this.todoListState.value.filter((todo) => todo.id !== todoId);
        this.todoListState.next(removedTodos);
      })
    ).subscribe(() => this.initTodoList());
  }

  onChangeTodo(todoId: string, updates: {content?: string; status?: TodoStatus}){
    const todo = this.todoListState.value.find(todo => todo.id === todoId);
    if(!todo) return;

    const newTodo = { 
      ...todo, 
      content: updates.content !== undefined ? updates.content : todo.content, 
      status: updates.status  !== undefined ? updates.status : todo.status
     };

    this.todoApi.editTodo(this.username, newTodo).pipe(
      tap(() => {
        const todos = this.todoListState.value.map(todo => (todo.id === todoId? newTodo: todo));
        this.todoListState.next([...todos]);
      })
    ).subscribe(() => this.initTodoList());
  }

  onChangeStatus(todoId: string, status: TodoStatus) {
    const updatedStatus = status === 'TODO' || status === 'INPROGRESS' ? 'COMPLETED' : 'TODO';
    this.onChangeTodo(todoId, {status: updatedStatus})
  }

  onEditTodo(todoId: string, updatedContent: string) {
    this.onChangeTodo(todoId, {content: updatedContent})
  }
}