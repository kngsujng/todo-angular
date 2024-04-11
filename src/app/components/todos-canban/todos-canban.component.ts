import { Component } from '@angular/core';
import { TodosListComponent } from '../todos-list/todos-list.component';
import { TodosCanbanService } from '../../share/todos-canban.service';
import { TodoComponent } from '../todo/todo.component';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TodoItem } from '../../model/todo';

@Component({
  selector: 'app-todos-canban',
  standalone: true,
  imports: [
    TodosListComponent,
    TodoComponent,
    CdkDropList,
    CdkDrag,
    CdkDropListGroup,
  ],
  templateUrl: './todos-canban.component.html',
  styleUrl: './todos-canban.component.scss',
})
export class TodosCanbanComponent {
  constructor(public canbanTodos: TodosCanbanService) {}

  drop(event: CdkDragDrop<TodoItem[]>) {
    console.log(event.previousContainer.id);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      if (
        event.container.id === 'completed' ||
        event.previousContainer.id === 'completed'
      ) {
        const transferredItem = event.container.data.find(
          (item) => item === event.container.data[event.currentIndex],
        );
        if (transferredItem) {
          transferredItem.isCompleted = !transferredItem?.isCompleted;
        }
      }
    }
  }
}
