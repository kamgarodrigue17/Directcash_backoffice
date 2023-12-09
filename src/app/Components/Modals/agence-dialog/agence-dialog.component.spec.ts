import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenceDialogComponent } from './agence-dialog.component';

describe('AgenceDialogComponent', () => {
  let component: AgenceDialogComponent;
  let fixture: ComponentFixture<AgenceDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgenceDialogComponent]
    });
    fixture = TestBed.createComponent(AgenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
