import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItem } from '../../model/todo';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  @Input() todo:TodoItem = {id: '', todo: '', isCompleted: false};
  @Output() deleteItemEvent = new EventEmitter<string>(); 
  @Output() toggleItemEvent = new EventEmitter<string>(); 


  removeItem(id: string){
    this.deleteItemEvent.emit(id);
  }
  toggleItem(id: string){
    this.toggleItemEvent.emit(id);
  }
}
