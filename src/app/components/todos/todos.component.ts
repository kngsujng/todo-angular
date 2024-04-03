import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItem } from '../../model/todo';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent {
  @Input() todos : TodoItem[] = [];
  @Output() deleteItemEvent = new EventEmitter<string>(); 
  // 삭제 기능 - 부모에게 지워야 할 Todo 전달 -> Output과 EventEmitter 활용 

  removeItem(todo: string){
    this.deleteItemEvent.emit(todo);
  }
}
