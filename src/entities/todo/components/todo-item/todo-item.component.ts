import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { EditTodoComponent } from 'src/features/todo/components/edit-todo';
import { type TodoItem } from '../../models/todo';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, EditTodoComponent],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  @Input() todo!: TodoItem;
  isEditing: boolean = false;

  changeEditMode(){
    this.isEditing = !this.isEditing;
  }
} 
