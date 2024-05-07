import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { login, signup } from 'src/api/firebase';
import { Auth } from 'src/app/model/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  loginObj: LoginModel  = new LoginModel();
  signupObj :SignupModel = new SignupModel();
  isLoginPage: boolean = true;
  errorMsg : string = '';
  
  constructor(private router: Router){}

  async onLogin() {
    const result = await login(this.loginObj);
    if(typeof result !== 'string'){
      this.router.navigateByUrl('/list');
    } else {
      switch (result){
        case 'auth/invalid-credential':
          this.errorMsg = '이메일 혹은 비밀번호가 잘못되었습니다.'
          break;
        default:
          this.errorMsg = `회원가입할 수 없습니다. 다시 시도해주세요. (Error: + ${result})`
      }
      setTimeout(()=>{this.errorMsg = ""}, 2000)
    }
  }

  async onRegister(){
    const result = await signup(this.signupObj);
    if(typeof result !== 'string'){
      this.router.navigateByUrl('/list');
    } else {
      switch (result){
        case 'auth/invalid-email':
          this.errorMsg = '올바르지 않은 이메일입니다.'
          break;
        case 'auth/weak-password':
          this.errorMsg = '비밀번호는 6글자 이상입니다.'
          break;
        case 'auth/email-already-in-use':
          this.errorMsg = '이미 존재하는 이메일입니다.'
          break;
        default:
          this.errorMsg = `회원가입할 수 없습니다. 다시 시도해주세요. (Error: + ${result})`
      }
      setTimeout(()=>{this.errorMsg = ""}, 2000)
    }
  }

  togglePage(){
    this.isLoginPage = !this.isLoginPage
  }
}

export class LoginModel  { 
  email: string;
  password: string;

  constructor() {
    this.email = ""; 
    this.password= ""
  }
}

export class SignupModel  { 
  email: string;
  name: string;
  password: string;

  constructor() {
    this.email = ""; 
    this.name = '';
    this.password= ""
  }
}
