import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  loginObj: LoginModel  = new LoginModel();
  signupObj :SignUpModel = new SignUpModel();
  isLoginPage: boolean = true;
  errorMsg : string = '';
  
  constructor(private router: Router){}

  onLogin() {
    const localUsers =  localStorage.getItem('angular-todo-user');

    if(localUsers === null) {
      this.errorMsg = "회원정보를 찾을 수 없습니다."
      setTimeout(()=>{this.errorMsg = ""}, 1500)
      return;
    };

    const users =  JSON.parse(localUsers);
    const isUserPresent =  users.find( (user:SignUpModel)=> user.email == this.loginObj.email && user.password == this.loginObj.password);
    if(isUserPresent != undefined) {
      localStorage.setItem('loggedUser', JSON.stringify(isUserPresent));
      this.router.navigateByUrl('/list');
    } else {
      this.errorMsg = "회원정보를 찾을 수 없습니다."
      setTimeout(()=>{this.errorMsg = ""}, 1500)
    }

  }

  onRegister(){
    const localUser = localStorage.getItem('angular-todo-user');
    if(localUser != null) {
      const users =  JSON.parse(localUser);
      users.push(this.signupObj);
      localStorage.setItem('angular-todo-user', JSON.stringify(users))
      localStorage.setItem('loggedUser', JSON.stringify(users));
      this.router.navigateByUrl('/list');
    } else {
      const users = [];
      users.push(this.signupObj);
      localStorage.setItem('angular-todo-user', JSON.stringify(users))
      localStorage.setItem('loggedUser', JSON.stringify(users));
      this.router.navigateByUrl('/list');
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

export class SignUpModel  {
  name: string;
  email: string;
  password: string;

  constructor() {
    this.email = "";
    this.name = "";
    this.password= ""
  }
}
