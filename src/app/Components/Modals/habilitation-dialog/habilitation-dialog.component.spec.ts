import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilitationDialogComponent } from './habilitation-dialog.component';

describe('HabilitationDialogComponent', () => {
  let component: HabilitationDialogComponent;
  let fixture: ComponentFixture<HabilitationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HabilitationDialogComponent]
    });
    fixture = TestBed.createComponent(HabilitationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
