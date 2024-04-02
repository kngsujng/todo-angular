import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [FormsModule], // input 값을 양방향 가져오려면 ngModel 필요, ngModel 가져오기 위해 import 
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss'
})
export class AddTodoComponent {
  inputVal: string = '';
  @Output() newItemEvent = new EventEmitter<string>(); 
  // 1. 자식 컴포넌트에서 부모 컴포넌트로 상태 전달 (Output)
  // 2. Output을 위한 EventEmitter 사용

  // onAdd() {
  //   console.log(this.inputVal) 
  // }

  addNewItem(){
    this.newItemEvent.emit(this.inputVal);
    this.inputVal='';
  }
}
