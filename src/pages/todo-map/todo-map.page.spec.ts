import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoMapPage } from './todo-map.page';

describe('NaverMapComponent', () => {
  let component: TodoMapPage;
  let fixture: ComponentFixture<TodoMapPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoMapPage]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodoMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
