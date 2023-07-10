import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapeValidationDialogComponent } from './etape-validation-dialog.component';

describe('EtapeValidationDialogComponent', () => {
  let component: EtapeValidationDialogComponent;
  let fixture: ComponentFixture<EtapeValidationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtapeValidationDialogComponent]
    });
    fixture = TestBed.createComponent(EtapeValidationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
