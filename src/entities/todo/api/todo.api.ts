import { Injectable } from "@angular/core";
import { get, ref, remove, set, update } from "firebase/database";
import { Observable, from } from "rxjs";
import { TodoItem, TodoStatus } from "src/entities/todo/models/todo";
import { database } from "src/shared/libs/firebase";
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class TodoApi {
  getTodos(username: string): Observable<TodoItem[]>{
    const promise = get((ref(database, `${username}/todos`)))
      .then((snapshot)=> {
        if(snapshot.exists()){
          const todos = Object.values(snapshot.val()) as TodoItem[];
          return todos.map(todo => (
            {
              ...todo,
              createdAt: new Date(todo.createdAt)
            }));
            
        } else {
          return [];
        }
      });
    return from(promise);
  }
  
  addTodo(userId: string, content: string, location: string):Observable<TodoItem> {
    const newTodo = {
      id: uuid(),
      content,
      status: 'TODO' as TodoStatus,
      createdAt: new Date().toDateString(),
      location,
    };
    const promise = set(ref(database, userId + `/todos/${newTodo.id}`), newTodo)
      .then(() => ({
          ...newTodo,
          createdAt: new Date(),
        })
      );
    return from(promise)
  }

  deleteTodo(userId: string, todoId: string) {
    const promise = remove(ref(database, userId + `/todos/${todoId}`));
    return from(promise);
  }

  toggleStatus(userId: string, todo: TodoItem){
    const { id : todoId } = todo;
    const newTodo: Record<string, Partial<TodoItem>> = {};
    newTodo[`${userId}/todos/${todoId}`] = todo
    const promise = update(ref(database), newTodo)
    return from(promise);
  }
}