import { get, ref, remove, set } from "firebase/database";
import { TodoItem } from "src/app/model/todo";
import { database } from "src/app/shared/firebase";
import { v4 as uuid } from 'uuid';

export class TodoApi {
  async getTodos(userId: string): Promise<TodoItem[] | []> {
    return await get((ref(database, `${userId}/todos`)))
      .then((snapshot)=> {
        if(snapshot.exists()){
          return Object.values(snapshot.val());
        }
        return []
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