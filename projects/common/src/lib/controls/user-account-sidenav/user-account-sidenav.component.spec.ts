import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountSidenavComponent } from './user-account-sidenav.component';

describe('UserAccountSidenavComponent', () => {
  let component: UserAccountSidenavComponent;
  let fixture: ComponentFixture<UserAccountSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAccountSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
