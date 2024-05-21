import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoItem } from 'src/entities/todo';
import { TodoService } from '../../services';

@Component({
  selector: 'edit-todo-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.scss'
})
export class EditTodoComponent implements OnInit {
  @Input() todo!: TodoItem;
  @Output() toggleEvent = new EventEmitter<void>();
  editedInputVal: string = '';
  
  private readonly todoService = inject(TodoService);

  ngOnInit(){
    this.editedInputVal = this.todo.content;
  }

  onSave() {
    this.todoService.onEditTodo(this.todo.id, this.editedInputVal);
    this.toggleEvent.emit();
    this.editedInputVal = '';
  }

  onCancel(){
    this.toggleEvent.emit();
  }

  isDisabled(){
    return this.editedInputVal.trim().length <= 0
  }
}
