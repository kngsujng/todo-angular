import { Injectable } from "@angular/core";
import { get, ref, remove, set } from "firebase/database";
import { Observable } from "rxjs";
import { TodoItem } from "src/entities/todo/models/todo";
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
  
  addTodo(userId: string, content: string, location: string) {
    const todoId = uuid()
    return set(ref(database, userId + `/todos/${todoId}`), {
      id: todoId,
      content: content,
      status: 'TODO',
      createdAt: new Date().toString(),
      location,
    })
  }

  deleteTodo(userId: string, todoId: string) {
    return remove(ref(database, userId + `/todos/${todoId}`))
  }
}