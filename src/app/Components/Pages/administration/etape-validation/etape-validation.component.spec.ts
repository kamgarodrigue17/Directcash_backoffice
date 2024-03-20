import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapeValidationComponent } from './etape-validation.component';

describe('EtapeValidationComponent', () => {
  let component: EtapeValidationComponent;
  let fixture: ComponentFixture<EtapeValidationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtapeValidationComponent]
    });
    fixture = TestBed.createComponent(EtapeValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
