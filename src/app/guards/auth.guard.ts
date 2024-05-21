import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { map } from "rxjs";
import { AuthService } from "../../features/auth/services/auth.service";
import { TodoService } from "src/features/todo/services";

export const AuthGuard:CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const todoService = inject(TodoService);

  return authService.checkAuthenticate().pipe(
    map((user) => {
      if(!user){
        window.alert('인증이 필요한 페이지입니다.');
        router.navigateByUrl('/login');
        return false; 
      }

      todoService.initTodoList().subscribe();
      return true;
    })
  )
}