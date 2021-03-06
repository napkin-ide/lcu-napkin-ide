import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrgDetailsComponent } from './org-details.component';

describe('OrgDetailsComponent', () => {
  let component: OrgDetailsComponent;
  let fixture: ComponentFixture<OrgDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
