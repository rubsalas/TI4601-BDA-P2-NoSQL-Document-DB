import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammedComponent } from './programmed.component';

describe('ProgrammedComponent', () => {
  let component: ProgrammedComponent;
  let fixture: ComponentFixture<ProgrammedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgrammedComponent]
    });
    fixture = TestBed.createComponent(ProgrammedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
