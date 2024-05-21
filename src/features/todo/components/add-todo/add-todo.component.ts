import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTodo } from '../../models/new-todo';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [FormsModule], // input 값을 양방향 가져오려면 ngModel 필요, ngModel 가져오기 위해 import
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss',
})
export class AddTodoComponent {
  @Output() newItemEvent = new EventEmitter<NewTodo>();
  
  newTodoContentVal: string = '';
  isShow: boolean = false;
  newTodoLocationVal: string = '';
  // 1. 자식 컴포넌트에서 부모 컴포넌트로 상태 전달 (Output)
  // 2. Output을 위한 EventEmitter 사용

  addNewItem(): void {
    if (!this.isShow) {
      this.newItemEvent.emit({
        content: this.newTodoContentVal,
        location: this.newTodoLocationVal,
      });
    }
    this.newTodoContentVal = '';
    this.newTodoLocationVal = '';
  }

  showLocationInput(): void {
    this.isShow = !this.isShow;
  }

  addNewItemLocation(): void {
    this.isShow = false;
  }

  showAddButton(inputVal: string){
    return this.isShow || this.isDisabled(inputVal)
  }

  isDisabled(inputVal: string){
    return inputVal.trim().length <= 0
  }
}
