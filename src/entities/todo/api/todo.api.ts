import { Injectable } from "@angular/core";
import { get, ref, remove, set } from "firebase/database";
import { Observable } from "rxjs";
import { TodoItem, TodoStatus } from "src/entities/todo/models/todo";
import { database } from "src/shared/libs/firebase";
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class TodoApi {
  getTodos(username: string){
    return new Observable<TodoItem[]>(observer => {
      get((ref(database, `${username}/todos`)))
        .then((snapshot)=> {
          if(snapshot.exists()){
            observer.next(Object.values(snapshot.val()));
          } else {
            observer.next([]);
           }
           observer.complete();
        })
    })
  }
  
  addTodo(userId: string, content: string, location: string):Observable<TodoItem> {
    return new Observable<TodoItem>(observer => {
      const newTodo = {
        id: uuid(),
        content,
        status: 'TODO' as TodoStatus,
        createdAt: new Date().toDateString(),
        location,
      };
      set(ref(database, userId + `/todos/${newTodo.id}`), newTodo)
        .then(() => {
          observer.next({
            ...newTodo,
            createdAt: new Date(),
          });
          observer.complete();
        });
    })
  }

  deleteTodo(userId: string, todoId: string) {
    new Observable(observer => {
      remove(ref(database, userId + `/todos/${todoId}`))
    })
  }
}