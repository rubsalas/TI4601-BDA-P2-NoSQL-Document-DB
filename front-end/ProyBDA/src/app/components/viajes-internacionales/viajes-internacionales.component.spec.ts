import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajesInternacionalesComponent } from './viajes-internacionales.component';

describe('ViajesInternacionalesComponent', () => {
  let component: ViajesInternacionalesComponent;
  let fixture: ComponentFixture<ViajesInternacionalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViajesInternacionalesComponent]
    });
    fixture = TestBed.createComponent(ViajesInternacionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
