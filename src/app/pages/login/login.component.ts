import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { signup } from 'src/api/firebase';
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
  signupObj :Auth = {email: '', name: '', password: ''};
  isLoginPage: boolean = true;
  errorMsg : string = '';
  
  constructor(private router: Router){}

  onLogin() {
    // const localUsers =  localStorage.getItem('angular-todo-user');

    // if(localUsers === null) {
    //   this.errorMsg = "회원정보를 찾을 수 없습니다."
    //   setTimeout(()=>{this.errorMsg = ""}, 1500)
    //   return;
    // };

    // const users =  JSON.parse(localUsers);
    // const isUserPresent =  users.find( (user:SignUpModel)=> user.email == this.loginObj.email && user.password == this.loginObj.password);
    // if(isUserPresent != undefined) {
    //   localStorage.setItem('loggedUser', JSON.stringify(isUserPresent));
    //   this.router.navigateByUrl('/list');
    // } else {
    //   this.errorMsg = "회원정보를 찾을 수 없습니다."
    //   setTimeout(()=>{this.errorMsg = ""}, 1500)
    // }

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
