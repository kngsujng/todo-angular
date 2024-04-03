import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { TodosComponent } from './components/todos/todos.component';
import { TodoItem } from './model/todo';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddTodoComponent, TodosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  todoList: TodoItem[] = [];

  onAddTodo(todo: string) {
    this.todoList.push({
      id: uuid(),
      todo: todo,
      isCompleted: false
    });
    console.table(this.todoList);
  }
  onRemoveTodo(id: string) {
    this.todoList = this.todoList.filter(item => item.id !== id)
    console.table(this.todoList);
  }
  onToggleTodo(id: string) {
    for(let todoItem of this.todoList){
      if(todoItem.id === id){
        todoItem.isCompleted = !todoItem.isCompleted;
        break;
      }
    }
    console.table(this.todoList);
  }
  onEditTodo(id: string, updatedTodo: string){
    for(let todoItem of this.todoList){
      if(todoItem.id === id){
        todoItem.todo = updatedTodo;
        break;
      }
    }
  }
}
