import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCalendarPage } from './todo-calendar.page';

describe('TodosCalendarComponent', () => {
  let component: TodoCalendarPage;
  let fixture: ComponentFixture<TodoCalendarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoCalendarPage]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodoCalendarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
