import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthModel } from 'src/entities/auth/models/auth';
import { AuthService } from 'src/entities/auth/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss'
})

export class LoginPage {
  isLoginPage: boolean = true;
  errorMsg : string = '';
  readonly formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')]),
    username: new FormControl(''),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  constructor(private authService: AuthService){}

  async onLogin() {
    const formData = this.formGroup.value as AuthModel;
    const result = await this.authService.authenticateUser(formData); // service에서 로그인관련 비즈니스 로직 처리
    if(typeof result === 'string') {
      this.errorMsg = result;
      setTimeout(()=>{this.errorMsg = ""}, 2000)
    };
    this.formGroup.reset();
  }

  async onRegister(){
    const formData = this.formGroup.value as AuthModel;
    const result = await this.authService.registerUser(formData);
    if(typeof result === 'string') {
      this.errorMsg = result;
      setTimeout(()=>{this.errorMsg = ""}, 2000)
    };
    this.formGroup.reset();
  }

  togglePage(){
    this.isLoginPage = !this.isLoginPage;
    this.formGroup.reset();
  }
}