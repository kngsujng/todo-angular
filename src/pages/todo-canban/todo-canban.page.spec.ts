import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCanbanPage } from './todo-canban.page';

describe('TodosCanbanComponent', () => {
  let component: TodoCanbanPage;
  let fixture: ComponentFixture<TodoCanbanPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoCanbanPage],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoCanbanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
