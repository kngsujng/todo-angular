import { CommonModule, DatePipe, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileState } from 'src/entities/auth';

@Component({
  selector: 'app-todo-head',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, DatePipe, CommonModule],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ],
  templateUrl: './todo-head.component.html',
  styleUrl: './todo-head.component.scss',
})
export class TodoHeadComponent {
  today: Date = new Date();
  username: string | null | undefined;
      
  constructor(
    private profileState : ProfileState,
  ) {
    this.username = this.profileState.getUsername();
  }
}
