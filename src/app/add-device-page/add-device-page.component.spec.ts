import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddDevicePageComponent} from './add-device-page.component';

describe('AddDevicePageComponent', () => {
  let component: AddDevicePageComponent;
  let fixture: ComponentFixture<AddDevicePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDevicePageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddDevicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
