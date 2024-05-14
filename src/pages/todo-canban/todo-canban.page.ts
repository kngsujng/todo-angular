import { Component, OnInit } from '@angular/core';
import { TodoItemComponent } from '../../entities/todo/components/todo-item/todo-item.component';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TodoItem, TodoStatus } from '../../entities/todo/models/todo';
import { TodoService } from '../../entities/todo/services/todo.service';
import { CommonModule } from '@angular/common';
import { RemoveTodoComponent } from 'src/features/todo/components/remove-todo/remove-todo.component';

@Component({
  selector: 'app-todo-canban',
  standalone: true,
  imports: [
    TodoItemComponent,
    CdkDropList,
    CdkDrag,
    CdkDropListGroup,
    CommonModule,
    RemoveTodoComponent
  ],
  templateUrl: './todo-canban.page.html',
  styleUrl: './todo-canban.page.scss',
})
export class TodoCanbanPage implements OnInit {
  todoTodoList: TodoItem[] = [];
  inProgressTodoList: TodoItem[] = [];
  completedTodoList: TodoItem[] = [];

  ngOnInit() {
    this.todoService.getTodoList('TODO').subscribe((todoList: TodoItem[]) => {
      this.todoTodoList = todoList;
    });
    this.todoService
      .getTodoList('INPROGRESS')
      .subscribe((todoList: TodoItem[]) => {
        this.inProgressTodoList = todoList;
      });
    this.todoService
      .getTodoList('COMPLETED')
      .subscribe((todoList: TodoItem[]) => {
        this.completedTodoList = todoList;
      });
  }

  constructor(private todoService: TodoService) {}

  drop(event: CdkDragDrop<TodoItem[]>) {
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
    }

    if (event.container.id === 'completed') {
      event.container.data.map((item) => {
        if (item === event.container.data[event.currentIndex]) {
          event.container.data[event.currentIndex].status = 'COMPLETED';
        } else {
          item;
        }
      });
    } else if (event.previousContainer.id === 'completed') {
      event.container.data.map((item) => {
        if (item === event.container.data[event.currentIndex]) {
          if (event.container.id === 'todo') {
            event.container.data[event.currentIndex].status = 'TODO';
          } else if (event.container.id === 'inProgress') {
            event.container.data[event.currentIndex].status = 'INPROGRESS';
          }
        }
      });
    }
  }

  onDeleteTodo(id: string) {
    this.todoService.onDeleteTodo(id);
  }

  onChangeStatus(id: string, status: TodoStatus) {
    this.todoService.onChangeStatus(id, status);
  }

  onEditTodo(id: string, updatedContent: string) {
    this.todoService.onEditTodo(id, updatedContent);
  }
}
