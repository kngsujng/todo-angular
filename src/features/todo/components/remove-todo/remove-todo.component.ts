import { Component, Input, inject } from '@angular/core';
import { TodoService } from 'src/entities/todo';

@Component({
  selector: 'remove-todo-component',
  standalone: true,
  imports: [],
  templateUrl: './remove-todo.component.html',
  styleUrl: './remove-todo.component.scss'
})
export class RemoveTodoComponent {
  @Input() todoId!: string;
  
  private readonly todoService = inject(TodoService);

  removeItem() {
    this.todoService.onDeleteTodo(this.todoId);
  }

}
