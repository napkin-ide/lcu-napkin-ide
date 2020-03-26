import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingUserAccountsComponent } from './existing-user-accounts.component';

describe('ExistingUsersComponent', () => {
  let component: ExistingUserAccountsComponent;
  let fixture: ComponentFixture<ExistingUserAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingUserAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingUserAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
