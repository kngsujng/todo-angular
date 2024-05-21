import { Component, Input, OnInit } from '@angular/core';
import { TodoItem } from '../../../../entities/todo/models/todo';
import { SortTodo } from '../../models';

@Component({
  selector: 'app-sort-todo',
  standalone: true,
  imports: [],
  templateUrl: './sort-todo.component.html',
  styleUrl: './sort-todo.component.scss',
})
export class SortTodoComponent implements OnInit{
  @Input() todoList !: TodoItem[] | null;
  sortByArr: SortTodo[] = ['최신순', '등록순', '가나다순'];

  constructor() {}

  ngOnInit(): void {
    this.onSortTodo('최신순'); // 기본 최신순 정렬
  }

  onSortTodo(orderBy: string){
    if(this.todoList === null) return;
    if (orderBy === '최신순') {
      console.log('최신순');
      return this.todoList.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }
    if (orderBy === '등록순') {
      console.log('등록순');
      return this.todoList.sort((a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    }
    if (orderBy === '가나다순') {
      console.log('가나다순');
      return this.todoList.sort((a, b) => a.content.localeCompare(b.content))
    }
    else {
      return this.todoList.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }
  }
}
