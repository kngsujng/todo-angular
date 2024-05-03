import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { getUser } from 'src/api/firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    const result = getUser()
    console.log(result)
    return true
    // if(typeof result !== 'string'){
    //   return true;
    // } 
    // this.router.navigateByUrl('/')
    // return false;
  }
}     