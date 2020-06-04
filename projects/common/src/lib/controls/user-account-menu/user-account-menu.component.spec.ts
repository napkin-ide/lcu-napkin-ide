import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountMenuComponent } from './user-account-menu.component';

describe('UserAccountMenuComponent', () => {
  let component: UserAccountMenuComponent;
  let fixture: ComponentFixture<UserAccountMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAccountMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
