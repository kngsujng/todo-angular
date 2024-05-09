import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { login, signup } from 'src/api/auth.api';
import { Auth } from 'src/app/model/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  isLoginPage: boolean = true;
  errorMsg : string = '';
  
 private readonly initFormValues: Auth = {
    email: '',
    password: '' 
  }

  readonly formGroup = new FormGroup({
    email: new FormControl(this.initFormValues.email),
    username: new FormControl(this.initFormValues.username),
    password: new FormControl(this.initFormValues.password)
  })

  constructor(private router: Router){}

  async onLogin() {
    const formData = this.formGroup.value as Auth;
    this.formGroup.reset();
    const result = await login(formData);
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
    const formData = this.formGroup.value as Auth;
    this.formGroup.reset();
    const result = await signup(formData);
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

  isDisabledBtn(): boolean {
    const formData = this.formGroup.value as Auth;
    return formData.email.trim().length === 0 ||
    formData?.username?.trim().length === 0 ||
    formData.password.trim().length === 0
  }
}