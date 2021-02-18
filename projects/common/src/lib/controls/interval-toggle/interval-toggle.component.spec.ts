import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IntervalToggleComponent } from './interval-toggle.component';

describe('IntervalToggleComponent', () => {
  let component: IntervalToggleComponent;
  let fixture: ComponentFixture<IntervalToggleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IntervalToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervalToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
