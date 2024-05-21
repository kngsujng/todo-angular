import { Injectable, inject } from "@angular/core";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { Observable } from "rxjs";
import { AuthModel } from "src/entities/auth/models/auth";
import { auth } from "src/shared/libs/firebase";
import { removeAccessToken } from "src/shared/libs/jwt.storage";
import { ProfileState } from "../state";

@Injectable({
  providedIn: 'root',
})
export class AuthApi {

  private readonly profileState = inject(ProfileState);

  checkAuthenticate() {
    return new Observable<boolean>(observer => {
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          observer.next(false);
        } else {
          this.profileState.initByFirebaseUser(user);
          observer.next(true);
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