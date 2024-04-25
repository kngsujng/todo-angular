import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class TodosCalendarComponent implements OnInit {
  today: Date = new Date();
  dates: { date: number; inCurrentMonth: boolean }[] = [];
  calendarTodos!:TodoItem[]

  constructor(
    private CalendarService: CalendarService,
    private todoService: TodoService,
    private dialog: Dialog
  ) {}

  ngOnInit(): void {
    this.loadDates();
    this.loadTodoList();
  }

  isToday(date: number): boolean {
    const today = new Date();
    return (
      today.getDate() === date && today.getMonth() === this.today.getMonth()
    );
  }

  loadDates(): void {
    this.dates = this.CalendarService.getCalendarData(this.today);
  }

  onChangeMonth = (few: number) => {
    const newDate = new Date(
      this.today.getFullYear(),
      this.today.getMonth() + few,
      1,
    );
    this.today = newDate;
    this.refreshCalendar();
  };

  // 모달창 관련 함수 -------
  openModalIfTodo(date: number){
    const calenderTodo = this.calendarTodos.find(todo => todo.createdAt.getDate() === date )
    if(calenderTodo){
      this.dialog.open<TodoItem>(TodoModalComponent, { data: calenderTodo, panelClass:'app-todo-modal' });
    }
  }

  haveTodo(date: number) : boolean{
    return !!this.calendarTodos.find(todo => todo.createdAt.getDate() === date ) 
  }
  // -----------------------

  private refreshCalendar(): void {
    this.loadDates();
    this.loadTodoList();
  }
  
  private loadTodoList(): void {
    this.todoService
      .getAllTodoList()
      .pipe(
        map((todos) =>
          todos.filter((todo) => this.isDateInCurrentMonth(todo.createdAt)),
        ),
      ).subscribe(value => this.calendarTodos = value);
  }
  
  private isDateInCurrentMonth(date: Date): boolean {
    return (
      date.getFullYear() === this.today.getFullYear() &&
      date.getMonth() === this.today.getMonth()
    );
  }
}


