import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsArchComponent } from './settings-arch.component';

describe('SettingsArchComponent', () => {
  let component: SettingsArchComponent;
  let fixture: ComponentFixture<SettingsArchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsArchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsArchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
