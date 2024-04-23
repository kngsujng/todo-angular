import { Component, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { OrderBy } from '../../model/todo';

@Component({
  selector: 'app-sort-todo',
  standalone: true,
  imports: [],
  templateUrl: './sort-todo.component.html',
  styleUrl: './sort-todo.component.scss',
})
export class SortTodoComponent {
  sortByArr: OrderBy[] = ['최신순', '등록순', '가나다순'];
  @Output() sortEv = new EventEmitter<string>()

  onSortItem(criteria: string) {
    this.sortEv.emit(criteria)
  }
}
