import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { getUser } from 'src/api/firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) { }

  async canActivate(): Promise<boolean> {
    const result = await getUser()
    if(typeof result !== 'string'){
      return true;
    } 
    this.router.navigateByUrl('/')
    return false;
  }
}     