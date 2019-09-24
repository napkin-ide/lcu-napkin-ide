import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgTermsComponent } from './org-terms.component';

describe('OrgTermsComponent', () => {
  let component: OrgTermsComponent;
  let fixture: ComponentFixture<OrgTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
