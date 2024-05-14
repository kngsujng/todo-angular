import { Injectable } from "@angular/core";
import { User, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { Auth } from "src/entities/auth/models/auth";
import { auth } from "src/shared/libs/firebase";
import { removeAccessToken } from "src/shared/libs/jwt.storage";

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  async login({email, password}: Auth) {
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

  async signup({email, username, password}: Auth) {
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

  logout() {
    signOut(auth); 
    removeAccessToken()
  };

  getUser (callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, (user) => callback(user));
  }
}