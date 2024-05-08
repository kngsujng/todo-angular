import { initializeApp } from "firebase/app";
import { get, getDatabase, push, ref, remove, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User, updateProfile  } from "firebase/auth";
import { LoginModel, SignupModel } from "src/app/pages/login/login.component";
import { environment } from "src/environments/environment";
import { v4 as uuid } from 'uuid';
import { TodoItem } from "src/app/model/todo";

const firebaseConfig = {
  apiKey: environment.FIREBASE_API_KEY,
  authDomain: environment.FIREBASE_AUTH_DOMAIN,
  databaseURL: environment.FIREBASE_DATABASE_URL,
  projectId: environment.FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export const signup = async ({email, name, password}: SignupModel) => {
  return await createUserWithEmailAndPassword(auth, email, password)
    .then(async (result) => {
        const user = result.user
        await updateProfile(user, { displayName: name });
        return { 
            ...user,
            email,
            displayName: name, 
            password
        }
    })
    .catch(error => error.code)
}

export const getUser = (callback: (user: User | null)=> void) => {
  return onAuthStateChanged(auth, (user) => callback(user));
}

export const login = async({email, password}: LoginModel) => {
  return await signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
      const user = result.user
      return {
        ...user, 
        email, 
        password
      }
    })
    .catch(error => error.code);
}

export const logout = () => signOut(auth);

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
