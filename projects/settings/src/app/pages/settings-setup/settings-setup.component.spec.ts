import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsSetupComponent } from './settings-setup.component';

describe('SettingsSetupComponent', () => {
  let component: SettingsSetupComponent;
  let fixture: ComponentFixture<SettingsSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
