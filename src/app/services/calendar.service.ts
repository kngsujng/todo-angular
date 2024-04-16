import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  getCalendarData(date: Date) {
    // 날짜 가져오기
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth(); // 0부터 시작하므로, 이번달을 구하려면 +1을 해줘야 함
    const prevLast = new Date(viewYear, viewMonth, 0); // 2024 03 31 일
    const thisLast = new Date(viewYear, viewMonth + 1, 0); // 2024 04 30 화
    const PLDate = prevLast.getDate(); // 지난달 마지막 날 31일
    const PLDay = prevLast.getDay(); // 지난달 마지막 요일 일요일(0)
    const TLDate = thisLast.getDate(); // 이번달 마지막 날 30일
    const TLDay = thisLast.getDay(); // 이번달 마지막 요일 화요일(2)

    // 지난달, 이번달, 다음달 달력 배열 만들고 합치기
    const prevDates = [];
    const thisDates = [...Array(TLDate + 1).keys()]
      .slice(1)
      .map((date) => ({ date, inCurrentMonth: true }));
    const nextDates = [];

    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift({ date: PLDate - i, inCurrentMonth: false });
    }
    for (let i = 1; i < 7 - TLDay; i++) {
      nextDates.push({ date: i, inCurrentMonth: false });
    }
    return prevDates.concat(thisDates, nextDates);
  }
}
