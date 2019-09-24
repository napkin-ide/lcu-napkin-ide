import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgHostComponent } from './org-host.component';

describe('OrgHostingComponent', () => {
  let component: OrgHostComponent;
  let fixture: ComponentFixture<OrgHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
