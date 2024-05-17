import { Component, Input, inject } from '@angular/core';
import { TodoItem, TodoService, TodoStatus } from 'src/entities/todo';

@Component({
  selector: 'toggle-status-component',
  standalone: true,
  imports: [],
  templateUrl: './toggle-status.component.html',
  styleUrl: './toggle-status.component.scss',
})
export class ToggleStatusComponent{
  private todoService = inject(TodoService);
  @Input() todo!: TodoItem;
    
  toggleItem(id: string, status: TodoStatus) {
    this.todoService.onChangeStatus(id, status);
  }
}
