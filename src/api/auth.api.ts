import { initializeApp } from "firebase/app";
import { User, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { Auth } from "src/app/model/auth";
import { removeAccessToken } from "src/app/shared/jwt.storage";
import { environment } from "src/environments/environment";

const firebaseConfig = {
  apiKey: environment.FIREBASE_API_KEY,
  authDomain: environment.FIREBASE_AUTH_DOMAIN,
  databaseURL: environment.FIREBASE_DATABASE_URL,
  projectId: environment.FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signup = async ({email, username, password}: Auth) => {
  return await createUserWithEmailAndPassword(auth, email, password)
    .then(async (result) => {
        const user = result.user
        await updateProfile(user, { displayName: username });
        return { 
            ...user,
            email,
            displayName: username, 
            password
        }
    })
    .catch(error => error.code)
}

export const getUser = (callback: (user: User | null)=> void) => {
  return onAuthStateChanged(auth, (user) => callback(user));
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

export const logout = () => {
  signOut(auth); 
  removeAccessToken()
};