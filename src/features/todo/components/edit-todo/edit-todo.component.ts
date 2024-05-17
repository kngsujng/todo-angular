import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoItem, TodoService } from 'src/entities/todo';

@Component({
  selector: 'edit-todo-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.scss'
})
export class EditTodoComponent implements OnInit {
  @Input() todo!: TodoItem;
  @Input() isEditing!: boolean;
  @Input() changeEditMode!: () => void;

  editedInputVal: string = '';
  
  private readonly todoService = inject(TodoService);

  ngOnInit(){
    this.editedInputVal = this.todo.content;
  }

  editItem() {
    this.todoService.onEditTodo(this.todo.id, this.editedInputVal);
    this.changeEditMode();
    // this.editedInputVal = '';
  }

  isDisabled(){
    return this.editedInputVal.trim().length <= 0
  }
}
