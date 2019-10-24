import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsActbarComponent } from './settings-actbar.component';

describe('SettingsActbarComponent', () => {
  let component: SettingsActbarComponent;
  let fixture: ComponentFixture<SettingsActbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsActbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsActbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
