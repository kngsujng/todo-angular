import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortTodoComponent } from './sort-todo.component';

describe('SortTodoComponent', () => {
  let component: SortTodoComponent;
  let fixture: ComponentFixture<SortTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortTodoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SortTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
