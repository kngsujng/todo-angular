import { Component } from '@angular/core';
import { TodosComponent } from '../todos/todos.component';
import { TodoListService } from '../../share/todo-list.service';

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [TodosComponent],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss'
})
export class TodosListComponent {
  constructor(public todoList: TodoListService) {}
  
  onRemoveTodo(id: string) {
    this.todoList.onRemoveTodo(id)
    console.table(this.todoList);
  }
  onToggleTodo(id: string) {
    this.todoList.onToggleTodo(id)
    console.table(this.todoList);
  }
  onEditTodo(id: string, updatedTodo: string){
    this.todoList.onEditTodo(id, updatedTodo)
  }
}
