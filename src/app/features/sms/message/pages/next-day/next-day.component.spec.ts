import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextDayComponent } from './next-day.component';

describe('NextDayComponent', () => {
  let component: NextDayComponent;
  let fixture: ComponentFixture<NextDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
