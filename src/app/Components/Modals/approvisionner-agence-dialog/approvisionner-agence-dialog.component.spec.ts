import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovisionnerAgenceDialogComponent } from './approvisionner-agence-dialog.component';

describe('ApprovisionnerAgenceDialogComponent', () => {
  let component: ApprovisionnerAgenceDialogComponent;
  let fixture: ComponentFixture<ApprovisionnerAgenceDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovisionnerAgenceDialogComponent]
    });
    fixture = TestBed.createComponent(ApprovisionnerAgenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
