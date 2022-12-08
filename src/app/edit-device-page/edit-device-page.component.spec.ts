import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDevicePageComponent } from './edit-device-page.component';

describe('EditDevicePageComponent', () => {
  let component: EditDevicePageComponent;
  let fixture: ComponentFixture<EditDevicePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDevicePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDevicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
