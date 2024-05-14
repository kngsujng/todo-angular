import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../entities/auth/services/auth.service";
import { map } from "rxjs";

export const AuthGuard:CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.checkAuthenticate().pipe(
    map((user) => {
      if(!user){
        window.alert('인증이 필요한 페이지입니다.');
        router.navigateByUrl('/login');
        return false; 
      }

      return true;
    })
  )
}