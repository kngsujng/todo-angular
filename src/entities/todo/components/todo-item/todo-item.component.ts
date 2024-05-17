import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { type TodoItem } from '../../models/todo';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  @Input() todo!: TodoItem;
  isEditing :boolean = false;
  @Input() onTodoUpdated !: () => void;
  
  @ContentChild('edit') editTemplate!: TemplateRef<any>;

  changeEditMode() {
    this.isEditing = !this.isEditing;
  }

  
}
