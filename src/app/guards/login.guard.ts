import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../features/auth/services/auth.service";
import { map } from "rxjs";

export const LoginGuard:CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // 로그인된 사용자는 login 페이지 못 가는 Guard 
  return authService.checkAuthenticate().pipe(
    map((user) => {
      if(user){
        router.navigateByUrl('/list');
        return false; 
      }

      return true;
    })
  )
}