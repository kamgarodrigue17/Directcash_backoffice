import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMonnaieShowInformationDialogComponent } from './gestion-monnaie-show-information-dialog.component';

describe('GestionMonnaieShowInformationDialogComponent', () => {
  let component: GestionMonnaieShowInformationDialogComponent;
  let fixture: ComponentFixture<GestionMonnaieShowInformationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionMonnaieShowInformationDialogComponent]
    });
    fixture = TestBed.createComponent(GestionMonnaieShowInformationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
