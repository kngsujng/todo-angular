import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../entities/auth/services/auth.service";

export const AuthGuard:CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if(!authService.isLoggedIn()){
    router.navigateByUrl('login');
    return false;
  } 
  return true;
}