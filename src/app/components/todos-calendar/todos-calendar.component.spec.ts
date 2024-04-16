import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosCalendarComponent } from './todos-calendar.component';

describe('TodosCalendarComponent', () => {
  let component: TodosCalendarComponent;
  let fixture: ComponentFixture<TodosCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosCalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodosCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
