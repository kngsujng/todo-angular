import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyTodoComponent } from './copy-todo.component';

describe('EditTodoComponent', () => {
  let component: CopyTodoComponent;
  let fixture: ComponentFixture<CopyTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopyTodoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CopyTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
