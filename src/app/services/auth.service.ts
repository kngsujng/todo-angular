import { Injectable } from "@angular/core";
import { Auth } from "../model/auth";
import { Router } from "@angular/router";
import { login, signup } from "src/api/auth.api";
import { getAccessToken, setAccessToken } from "../shared/jwt.storage";

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  constructor(private router: Router){}

  isLoggedIn(): boolean {
    const accessToken = getAccessToken();
    if(!!accessToken){
      return true;
    } 
    return false;
  }

  async authenticateUser(dto: Auth): Promise<string | undefined>{
    const result = await login(dto); // firebase login 기능 처리
    if(typeof result !== 'string'){
      setAccessToken(result.accessToken);
      if(result.accessToken === getAccessToken()){
        this.router.navigateByUrl('/list');
        return;
      } else {
        return 'Token 인증에 실패했습니다.'
      }
    } else {
      switch (result){
        case 'auth/invalid-email':
          return '이메일을 찾을 수 없습니다.'
        case 'auth/invalid-credential':
          return '이메일 혹은 비밀번호가 잘못되었습니다.'
        default:
          return `로그인할 수 없습니다. (${result})`
      }
    }
  }

  async registerUser(dto: Auth): Promise<string | undefined>{
    const result = await signup(dto);
    if(typeof result !== 'string'){
      this.router.navigateByUrl('/list');
      setAccessToken(result.accessToken);
      return;
    } else {
      switch (result){
        case 'auth/invalid-email':
          return '올바르지 않은 이메일입니다.'
        case 'auth/weak-password':
          return '비밀번호는 6글자 이상입니다.'
        case 'auth/email-already-in-use':
          return '이미 존재하는 이메일입니다.'
        default:
          return `회원가입할 수 없습니다. (${result})`
      }
    }
  }
}