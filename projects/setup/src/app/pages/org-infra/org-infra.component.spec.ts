import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrgInfraComponent } from './org-infra.component';

describe('OrgInfraComponent', () => {
  let component: OrgInfraComponent;
  let fixture: ComponentFixture<OrgInfraComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgInfraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgInfraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
