import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/entities/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly authService = inject(AuthService);

  loadedCredentials: boolean = false;

  constructor(){
    this.authService.checkAuthenticate().pipe(
      tap(() => this.loadedCredentials = true)
    ).subscribe();
  }
}
 