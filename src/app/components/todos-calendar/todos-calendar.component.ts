import { CommonModule, DatePipe } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { TodoService } from 'src/app/services/todo.service';
import { TodoItem } from 'src/app/model/todo';
import { map } from 'rxjs';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { TodoModalComponent } from '../todo-modal/todo-modal.component';

@Component({
  selector: 'app-todos-calendar',
  standalone: true,
  imports: [DatePipe, CommonModule, DialogModule],
  templateUrl: './todos-calendar.component.html',
  styleUrl: './todos-calendar.component.scss',
})
export class TodosCalendarComponent implements OnInit, DoCheck {
  today: Date = new Date();
  calendarTodos!:TodoItem[]

  constructor(
    private calendarService: CalendarService,
    private todoService: TodoService,
    private dialog: Dialog
  ) {}

  ngOnInit(): void {
    this.calendarService.initializeCalendar();
    this.loadTodoList()
  }

  ngDoCheck(){
    this.loadTodoList()
  }

  onChangeMonth = (few: -1 | 1) => {
    this.calendarService.onChangeMonth(few)
  };
  
  private loadTodoList(): void {
    this.todoService
      .getAllTodoList()
      .pipe(
        map((todos) =>
          todos.filter((todo) => this.calendarService.isInViewMonth(todo.createdAt)),
        ),
      ).subscribe(value => {
        this.calendarTodos = value;
        if (this.calendarTodos.length > 0) {
          const dateArr = document.querySelectorAll('#date'); 
          for (let calendarTodo of this.calendarTodos) {
            dateArr.forEach(date => {
              if(this.calendarService.isInViewMonth(calendarTodo.createdAt) && +date.innerHTML === calendarTodo.createdAt.getDate()){
                // todo있는 날짜 우측 상단 빨간 점 표시 
                const todoDateEl = document.createElement("div");
                date.appendChild(todoDateEl);
                todoDateEl.classList.add("absolute", "top-0", "right-5", "w-1", "h-1", "bg-red-600", "rounded-full"); // Tailwind CSS 클래스 추가

                // todo있는 날짜 모달 버튼 추가 
                date.addEventListener('click', ()=> {
                  this.dialog.open<TodoItem>(TodoModalComponent, { data: calendarTodo, panelClass:'app-todo-modal' });
                })
                date.classList.add('cursor-pointer', 'hover:rounded-xl', 'hover:bg-gray-100')
              }
            })
          }
        }
      });
  }
}