import { Component } from '@angular/core';
import { TodoListWidget } from 'src/widgets/todo-list/todo-list.widget';

@Component({
  selector: 'todo-list-page',
  standalone: true,
  imports: [TodoListWidget],
  templateUrl: './todo-list.page.html',
  styleUrl: './todo-list.page.scss',
})
export class TodoListPage {
  constructor(){}
}
