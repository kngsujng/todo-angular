import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [AuthGuardService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(){}
}
 