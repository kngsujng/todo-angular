import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from 'src/app/model/auth';
import { AuthService } from 'src/app/services/auth.service';

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
  readonly formGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    username: new FormControl(''),
    password: new FormControl('', Validators.minLength(6))
  })

  constructor(private authService: AuthService){}

  async onLogin() {
    const formData = this.formGroup.value as Auth;
    const result = await this.authService.authenticateUser(formData); // service에서 로그인관련 비즈니스 로직 처리
    if(typeof result === 'string') {
      this.errorMsg = result;
      setTimeout(()=>{this.errorMsg = ""}, 2000)
    };
    this.formGroup.reset();
  }

  async onRegister(){
    const formData = this.formGroup.value as Auth;
    const result = await this.authService.registerUser(formData);
    if(typeof result === 'string') {
      this.errorMsg = result;
      setTimeout(()=>{this.errorMsg = ""}, 2000)
    };
    this.formGroup.reset();
  }

  togglePage(){
    this.isLoginPage = !this.isLoginPage
  }
}