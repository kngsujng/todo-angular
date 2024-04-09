import { Component } from '@angular/core';
import { TodoListService } from '../../share/todo-list.service';
import { TodosCanbanService } from '../../share/todos-canban.service';

@Component({
  selector: 'app-sort-todo',
  standalone: true,
  imports: [],
  templateUrl: './sort-todo.component.html',
  styleUrl: './sort-todo.component.scss',
})
export class SortTodoComponent {
  sortCriteria: '최신순' | '등록순' | '가나다순' | '완료순' = '최신순';
  sortByArr = ['최신순', '등록순', '가나다순', '완료순'];

  constructor(
    public listTodos: TodoListService,
    public canbanTodos: TodosCanbanService,
  ) {}
}
