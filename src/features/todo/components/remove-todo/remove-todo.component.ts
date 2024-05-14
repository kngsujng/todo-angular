import { Component, Input, inject } from '@angular/core';
import { TodoItem, TodoService } from 'src/entities/todo';

@Component({
  selector: 'remove-todo-component',
  standalone: true,
  imports: [],
  templateUrl: './remove-todo.component.html',
  styleUrl: './remove-todo.component.scss'
})
export class RemoveTodoComponent {
  @Input() todo!: TodoItem;
  
  private readonly todoService = inject(TodoService);

  removeItem(id: string) {
    this.todoService.onDeleteTodo(id);
  }

}
