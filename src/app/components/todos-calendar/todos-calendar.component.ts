import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';

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

  constructor(private CalendarService: CalendarService) {}

  ngOnInit(): void {
    this.loadDates();
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

  onChangePrevMonth = () => {
    const newDate = new Date(this.today);
    newDate.setMonth(this.today.getMonth() - 1, 1);
    this.today = newDate;
    this.loadDates();
  };

  onChangeNextMonth = () => {
    const newDate = new Date(this.today);
    newDate.setMonth(this.today.getMonth() + 1, 1);
    this.today = newDate;
    this.loadDates();
  };
}
