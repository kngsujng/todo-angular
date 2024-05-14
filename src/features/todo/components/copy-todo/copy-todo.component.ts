import { Component, Input } from '@angular/core';
import { TodoItem } from 'src/entities/todo';

@Component({
  selector: 'copy-todo-component',
  standalone: true,
  imports: [],
  templateUrl: './copy-todo.component.html',
  styleUrl: './copy-todo.component.scss',
})
export class CopyTodoComponent {  
  @Input() todo!: TodoItem;
  
  async copyTodoText(todoText: string) {
    // TODO Toast 공통 컴포넌트 구현
    try {
      await navigator.clipboard.writeText(todoText);
      alert('클립보드에 복사되었습니다.');
    } catch (e) {
      alert('복사에 실패하였습니다');
    }
  }
}
