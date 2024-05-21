import { Injectable, computed, signal } from "@angular/core";
import { UserModel } from "../models";
import { User } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class ProfileState{
  
  private readonly _profile = signal<UserModel|null>(null);
  readonly profile = computed(() => this._profile());

  getUsername(){
    const username = this.profile()?.displayName;
    if(!username){
      throw new Error('UserName is not found');
    }

    return username;
  }

  initByFirebaseUser(user: User){
    this._profile.set({
      uid: user.uid,
      email: user.email ?? '',
      displayName: user.displayName ?? '',
      photoURL: user.photoURL ?? ''
    })
  }
}