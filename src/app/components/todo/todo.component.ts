import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoStatus, type TodoItem } from '../../model/todo';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  isEditing = false;
  editedInputVal: string = '';

  @Input() todo!: TodoItem;
  @Output() removeItemEvent = new EventEmitter<string>();
  @Output() toggleItemEvent = new EventEmitter<TodoStatus>();
  @Output() editItemEvent = new EventEmitter<string>();

  removeItem(id: string) {
    this.removeItemEvent.emit(id);
  }

  toggleItem(status: TodoStatus) {
    this.toggleItemEvent.emit(status);
  }

  editItem() {
    this.editItemEvent.emit(this.editedInputVal);
    this.isEditing = false;
    this.editedInputVal = '';
  }

  changeEditMode() {
    this.isEditing = true;
    this.editedInputVal = this.todo.todo;
  }
}
