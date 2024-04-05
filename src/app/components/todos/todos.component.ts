import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoComponent } from '../todo/todo.component';
import { TodoListService } from '../../share/todo-list.service';

@Component({
  selector: 'app-todos',
  standalone: true,
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
  imports: [TodoComponent],
})
export class TodosComponent {
  constructor(public todos: TodoListService) {}

  @Output() deleteItemEvent = new EventEmitter<string>();
  @Output() toggleItemEvent = new EventEmitter<string>();
  // 삭제 기능 - 부모에게 지워야 할 Todo 전달 -> Output과 EventEmitter 활용
  @Output() editItemEvent = new EventEmitter<{ id: string; todo: string }>();

  removeItem(id: string) {
    this.deleteItemEvent.emit(id);
  }
  toggleItem(id: string) {
    this.toggleItemEvent.emit(id);
  }
  editItem({ id, todo }: { id: string; todo: string }) {
    this.editItemEvent.emit({ id, todo });
  }
}
