import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveTodoComponent } from './remove-todo.component';

describe('RemoveTodoComponent', () => {
  let component: RemoveTodoComponent;
  let fixture: ComponentFixture<RemoveTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveTodoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemoveTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
