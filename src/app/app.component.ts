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
  todoList: TodoItem[] = [
    {id: '1', todo: '밥먹기', isCompleted: false}, 
    {id: '2', todo: '운동가기', isCompleted: false}, 
    {id: '3', todo: '일하러 가기', isCompleted: false}, 
    {id: '4', todo: '동해물과 백두산이 마르고 닳도록 하나님이 보우하사 우리 나라 만세', isCompleted: false}, 
    {id: '5', todo: '123', isCompleted: false}, 
    {id: '6', todo: '동해물과 백두산이 마르고 닳도록 하나님이 보우하사 우리 나라 만세 동해물과 백두산이 마르고 닳도록 하나님이 보우하사 우리 나라 만세', isCompleted: false},
    {id: '7', todo: '밥먹기', isCompleted: false}, 
    {id: '8', todo: '운동가기', isCompleted: false}, 
    {id: '9', todo: '일하러 가기', isCompleted: false}, 
    {id: '10', todo: '동해물과 백두산이 마르고 닳도록 하나님이 보우하사 우리 나라 만세', isCompleted: false}, 
    {id: '11', todo: '123', isCompleted: false}, 
    {id: '12', todo: '동해물과 백두산이 마르고 닳도록 하나님이 보우하사 우리 나라 만세 동해물과 백두산이 마르고 닳도록 하나님이 보우하사 우리 나라 만세', isCompleted: false}
  ];  

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
