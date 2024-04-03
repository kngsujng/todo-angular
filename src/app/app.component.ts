import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { TodosComponent } from './components/todos/todos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddTodoComponent, TodosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  todoList: string[] = [];

  onAddTodo(todo: string){
    this.todoList.push(todo);
    console.table(this.todoList);
  }
  onRemoveTodo(todo: string){
    this.todoList = this.todoList.filter(item => item !== todo)
    console.table(this.todoList);
  }
}
