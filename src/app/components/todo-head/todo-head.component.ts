import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-todo-head',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './todo-head.component.html',
  styleUrl: './todo-head.component.scss'
})
export class TodoHeadComponent {

}
