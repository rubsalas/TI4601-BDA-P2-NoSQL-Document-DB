import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajesProgramadosComponent } from './viajes-programados.component';

describe('ViajesProgramadosComponent', () => {
  let component: ViajesProgramadosComponent;
  let fixture: ComponentFixture<ViajesProgramadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViajesProgramadosComponent]
    });
    fixture = TestBed.createComponent(ViajesProgramadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
