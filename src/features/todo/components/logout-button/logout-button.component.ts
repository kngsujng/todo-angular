import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/entities/auth';

@Component({
  selector: 'logout-button',
  standalone: true,
  imports: [],
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.scss'
})
export class LogoutButtonComponent{

  private readonly authService = inject(AuthService);

  private readonly router = inject(Router);
  
  onLogout(){
    this.authService.logoutUser();
    this.router.navigateByUrl('/login')
  }
}
