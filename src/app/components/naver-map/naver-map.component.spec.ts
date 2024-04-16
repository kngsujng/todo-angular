import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaverMapComponent } from './naver-map.component';

describe('NaverMapComponent', () => {
  let component: NaverMapComponent;
  let fixture: ComponentFixture<NaverMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NaverMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NaverMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
