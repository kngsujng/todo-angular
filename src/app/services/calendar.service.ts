import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {  
   today = new Date();
   viewMonth = this.today.getMonth(); 
   viewYear = this.today.getFullYear();
  
  initializeCalendar(): void{
    const calendarDates = document.getElementById('calendarDates');
    const currentMonthEl = document.getElementById('viewMonth');
    
    const firstDayOfMonth = new Date(this.viewYear, this.viewMonth, 1);
    const daysInMonth = new Date(this.viewYear, this.viewMonth + 1, 0).getDate();
    const startDayOfWeek = firstDayOfMonth.getDay();

    currentMonthEl!.textContent = `${this.viewYear}년 ${this.viewMonth + 1}월`;
    calendarDates!.innerHTML = "";

    // 이전 달 
    for(let i = 0; i < startDayOfWeek; i++){
      const emptyDate = document.createElement("div");
      calendarDates?.appendChild(emptyDate);
    }

    // 이번 달 
    for (let i = 1; i <= daysInMonth; i++) {
      const dateElement = document.createElement("div");
      dateElement.setAttribute('id', 'date');
      dateElement.classList.add("relative", "p-2"); // tailwind css
      dateElement.textContent = i.toString();
      calendarDates?.appendChild(dateElement);

      if(this.isInViewMonth() && this.today.getDate() === i){
        dateElement.classList.add("font-extrabold", "text-[#00C471]"); // tailwind css
      }
    }
  }  

  onChangeMonth(few: -1 | 1){
      if(few === -1){
        this.viewMonth--;
        if(this.viewMonth < 0){
          this.viewMonth = 11;
          this.viewYear--;
        }
      } else {
        this.viewMonth++;
        if(this.viewMonth > 11){
          this.viewMonth = 0;
          this.viewYear++;
        }
      }
      this.initializeCalendar()
  }

  isInViewMonth(date?: Date) : boolean{
      if(date){
        // view 월과 date의 월이 같은지 비교 (ex. calendarTodo date 확인)
        return this.viewYear === date.getFullYear() && this.viewMonth === date.getMonth()
      }
      // view의 월과 현재 월이 같은지 비교 
      return this.today.getFullYear() === this.viewYear && this.today.getMonth() === this.viewMonth
  }
}