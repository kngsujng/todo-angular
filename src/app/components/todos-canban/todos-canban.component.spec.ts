import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosCanbanComponent } from './todos-canban.component';

describe('TodosCanbanComponent', () => {
  let component: TodosCanbanComponent;
  let fixture: ComponentFixture<TodosCanbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosCanbanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodosCanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
