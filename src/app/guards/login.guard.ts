import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const LoginGuard:CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if(authService.isLoggedIn()){
    router.navigateByUrl('list');
    return false;
  } 
  return true;
}