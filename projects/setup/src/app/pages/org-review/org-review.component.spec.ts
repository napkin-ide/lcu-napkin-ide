import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrgReviewComponent } from './org-review.component';

describe('OrgReviewComponent', () => {
  let component: OrgReviewComponent;
  let fixture: ComponentFixture<OrgReviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
