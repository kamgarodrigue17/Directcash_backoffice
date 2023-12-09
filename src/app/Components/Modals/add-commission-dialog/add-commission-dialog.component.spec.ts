import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommissionDialogComponent } from './add-commission-dialog.component';

describe('AddCommissionDialogComponent', () => {
  let component: AddCommissionDialogComponent;
  let fixture: ComponentFixture<AddCommissionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCommissionDialogComponent]
    });
    fixture = TestBed.createComponent(AddCommissionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
