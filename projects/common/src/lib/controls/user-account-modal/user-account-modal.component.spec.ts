import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserAccountModalComponent } from './user-account-modal.component';

describe('UserAccountModalComponent', () => {
  let component: UserAccountModalComponent;
  let fixture: ComponentFixture<UserAccountModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAccountModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
