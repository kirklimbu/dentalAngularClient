import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitTypeComponent } from './visit-type.component';

describe('VisitTypeComponent', () => {
  let component: VisitTypeComponent;
  let fixture: ComponentFixture<VisitTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
