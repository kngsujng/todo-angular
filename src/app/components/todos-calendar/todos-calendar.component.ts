import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { TodoService } from 'src/app/services/todo.service';
import { TodoItem } from 'src/app/model/todo';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-todos-calendar',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './todos-calendar.component.html',
  styleUrl: './todos-calendar.component.scss',
})
export class TodosCalendarComponent implements OnInit {
  today: Date = new Date();
  dates: { date: number; inCurrentMonth: boolean }[] = [];
  allTodoList$: Observable<TodoItem[]> = this.todoService.getAllTodoList();
  calendarTodos$!: Observable<TodoItem[]>;

  constructor(
    private CalendarService: CalendarService,
    private todoService: TodoService,
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
    // Angular가 today에 대한 참조 변경을 감지하고 연관된 뷰를 업데이트할 수 있도록 새로운 Date 객체 생성 및 할당 (객체 불변성)
    const newDate = new Date(
      this.today.getFullYear(),
      this.today.getMonth() + few,
      1,
    );
    this.today = newDate;
    this.refreshCalendar();
  };

  private refreshCalendar(): void {
    this.loadDates();
    this.loadTodoList();
  }
  
  private loadTodoList(): void {
    this.calendarTodos$ = this.todoService
      .getAllTodoList()
      .pipe(
        map((todos) =>
          todos.filter((todo) => this.isDateInCurrentMonth(todo.createdAt)),
        ),
      );
  }
  
  private isDateInCurrentMonth(date: Date): boolean {
    return (
      date.getFullYear() === this.today.getFullYear() &&
      date.getMonth() === this.today.getMonth()
    );
  }
}


