import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Auth } from "src/app/model/auth";
import { environment } from "src/environments/environment";

const firebaseConfig = {
  apiKey: environment.FIREBASE_API_KEY,
  authDomain: environment.FIREBASE_AUTH_DOMAIN,
  databaseURL: environment.FIREBASE_DATABASE_URL,
  projectId: environment.FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signup = async ({email, name, password}: Auth) => {
  return await createUserWithEmailAndPassword(auth, email, password)
    .then(
      result => {
        return { 
          ...result,  
          user : {
            ...result.user, 
            email,
            displayName: name, 
            password
        }}
    })
    .catch(error => error.code)
}

export const getUser = () => {
  return onAuthStateChanged(auth, (user) => user);
}

export const login = async({email, password}: Auth) => {
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