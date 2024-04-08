import { TestBed } from '@angular/core/testing';

import { TodosCanbanService } from './todos-canban.service';

describe('TodosCanbanService', () => {
  let service: TodosCanbanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodosCanbanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
