import { initializeApp } from "firebase/app";
import { get, getDatabase, ref, remove, set } from "firebase/database";
import { TodoItem } from "src/app/model/todo";
import { environment } from "src/environments/environment";
import { v4 as uuid } from 'uuid';

const firebaseConfig = {
  apiKey: environment.FIREBASE_API_KEY,
  authDomain: environment.FIREBASE_AUTH_DOMAIN,
  databaseURL: environment.FIREBASE_DATABASE_URL,
  projectId: environment.FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const getTodos = async (userId: string): Promise<TodoItem[] | []> => {
  return await get((ref(database, `${userId}/todos`)))
    .then((snapshot)=> {
      if(snapshot.exists()){
        return Object.values(snapshot.val());
      }
      return []
    })
}

export const addTodo = (userId: string, content: string, location: string) => {
  const todoId = uuid()
  return set(ref(database, userId + `/todos/${todoId}`), {
    id: todoId,
    content: content,
    status: 'TODO',
    createdAt: new Date().toString(),
    location,
  })
}

export const deleteTodo = (userId: string, todoId: string) => {
  return remove(ref(database, userId + `/todos/${todoId}`))
}
