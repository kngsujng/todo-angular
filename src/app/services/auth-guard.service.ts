import { Injectable, signal } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { getUser } from 'src/api/firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  loggedUser = signal({email: '', name:''})
  
  
  constructor(private router: Router) { 
    getUser(user => {
      if(user) {
        this.loggedUser.set({
             email: user.email || '',
             name: user.displayName || '',
        })
      }
    })
  }

  canActivate(): boolean {
    if(this.loggedUser().email !== ''){
      return true
    }
    this.router.navigateByUrl('/')
    return false;
  }
}     