import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  canActivate(): boolean {
    const localUser = localStorage.getItem('loggedUser');
    if(localUser !== null){
      return true;
    } 
    this.router.navigateByUrl('/')
    return false;
  }
  constructor(private router: Router) { }
}
