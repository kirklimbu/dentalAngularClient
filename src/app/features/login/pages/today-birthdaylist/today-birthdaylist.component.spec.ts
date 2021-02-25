import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayBirthdaylistComponent } from './today-birthdaylist.component';

describe('TodayBirthdaylistComponent', () => {
  let component: TodayBirthdaylistComponent;
  let fixture: ComponentFixture<TodayBirthdaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodayBirthdaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayBirthdaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
