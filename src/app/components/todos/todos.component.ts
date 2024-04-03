import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItem } from '../../model/todo';
import { TodoComponent } from "../todo/todo.component";

@Component({
    selector: 'app-todos',
    standalone: true,
    templateUrl: './todos.component.html',
    styleUrl: './todos.component.scss',
    imports: [TodoComponent]
})
export class TodosComponent {
  @Input() todos : TodoItem[] = [];
  @Output() deleteItemEvent = new EventEmitter<string>(); 
  // 삭제 기능 - 부모에게 지워야 할 Todo 전달 -> Output과 EventEmitter 활용 

  removeItem(todo: string){
    this.deleteItemEvent.emit(todo);
  }
}
