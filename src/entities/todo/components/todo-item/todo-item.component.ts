import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type TodoItem } from '../../models/todo';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  @Input() todo!: TodoItem;
  @Output() editItemEvent = new EventEmitter<string>();

  isEditing = false;
  editedInputVal: string = '';

  editItem() {
    this.editItemEvent.emit(this.editedInputVal);
    this.isEditing = false;
    this.editedInputVal = '';
  }

  changeEditMode() {
    this.isEditing = true;
    this.editedInputVal = this.todo.content;
  }

  isDisabled(){
    return this.editedInputVal.trim().length <= 0
  }

  editStatus(status: boolean){
    return this.isEditing = status
  }
}
