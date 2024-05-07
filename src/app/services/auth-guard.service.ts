import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { getUser } from 'src/api/firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  loggedUser = {email: '', name:''}
  constructor(private router: Router) { }

  canActivate(): boolean {
    getUser(user => {
      if(user) {
        this.loggedUser = {
          email: user.email || '',
          name: user.displayName || '',
        }
      }
    })

    if(this.loggedUser.email !== ''){
      return true
    }
    this.router.navigateByUrl('/')
    return false;
  }
}     