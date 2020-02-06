import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgAccessComponent } from './org-access.component';

describe('OrgAccessComponent', () => {
  let component: OrgAccessComponent;
  let fixture: ComponentFixture<OrgAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
