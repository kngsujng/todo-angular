import { Injectable } from "@angular/core";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { Observable } from "rxjs";
import { AuthModel, UserModel } from "src/entities/auth/models/auth";
import { auth } from "src/shared/libs/firebase";
import { removeAccessToken } from "src/shared/libs/jwt.storage";

@Injectable({
  providedIn: 'root',
})
export class AuthApi {

  checkAuthenticate() {
    return new Observable<UserModel|null>(observer => {
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          observer.next(null);
        } else {
          observer.next({
            uid: user.uid,
            email: user.email!,
            displayName: user.displayName!,
            photoURL: user.photoURL!,
          });
        }
        observer.complete();
      });
    });
  }

  async login({email, password}: AuthModel) {
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

  async signup({email, username, password}: AuthModel) {
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

}